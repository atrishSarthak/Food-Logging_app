-- Enable fuzzy search for Indian food name variants
create extension if not exists pg_trgm;

-- Master food database (seeded from IFCT 2017 + Open Food Facts India + USDA)
create table foods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_local text,                    -- Hindi/regional name e.g. "दाल मखनी"
  brand text,                         -- null for whole/home foods
  barcode text unique,                -- EAN-13 for packaged foods
  serving_size_g numeric not null default 100,
  serving_label text,                 -- "1 katori", "1 roti", "100g"
  calories numeric not null,
  protein_g numeric default 0,
  carbs_g numeric default 0,
  fat_g numeric default 0,
  fiber_g numeric default 0,
  sugar_g numeric default 0,
  sodium_mg numeric default 0,
  source text check (source in ('ifct','off','usda','community','ai_estimate')),
  verified boolean default false,
  created_at timestamptz default now()
);

-- Trigram indexes for fuzzy search — critical for Indian food name variants
create index foods_name_trgm on foods using gin (name gin_trgm_ops);
create index foods_name_local_trgm on foods using gin (name_local gin_trgm_ops);
create index foods_barcode_idx on foods (barcode) where barcode is not null;

-- User food logs (one row per food item per meal)
create table food_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  food_id uuid references foods not null,
  meal_type text not null check (meal_type in ('breakfast','lunch','dinner','snack')),
  quantity_g numeric not null,
  calories numeric not null,          -- denormalised for fast aggregation
  protein_g numeric not null default 0,
  carbs_g numeric not null default 0,
  fat_g numeric not null default 0,
  photo_url text,                     -- storage URL if logged via AI scan
  source text check (source in ('manual','ai_scan','barcode','quick_add')),
  logged_at timestamptz default now(),
  date date
);

create index food_logs_user_date on food_logs (user_id, date desc);

-- Trigger to automatically set date from logged_at
create or replace function set_food_log_date()
returns trigger as $$
begin
  new.date := new.logged_at::date;
  return new;
end;
$$ language plpgsql;

create trigger set_food_log_date_trigger
  before insert or update on food_logs
  for each row
  execute function set_food_log_date();

-- Row-level security
alter table food_logs enable row level security;
create policy "users see own logs"
  on food_logs for all using (auth.uid() = user_id);

-- Daily macro totals view (used by diary home screen and analytics)
create or replace view daily_totals as
select
  user_id,
  date,
  round(sum(calories))    as total_calories,
  round(sum(protein_g))   as total_protein,
  round(sum(carbs_g))     as total_carbs,
  round(sum(fat_g))       as total_fat,
  count(*)                as total_entries
from food_logs
group by user_id, date;

-- User nutrition goals
create table nutrition_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null unique,
  calorie_goal int not null default 2000,
  protein_goal_g int not null default 150,
  carbs_goal_g int not null default 200,
  fat_goal_g int not null default 65,
  activity_level text check (
    activity_level in ('sedentary','light','moderate','active','very_active')
  ) default 'moderate',
  goal_type text check (
    goal_type in ('lose','maintain','gain')
  ) default 'maintain',
  updated_at timestamptz default now()
);

alter table nutrition_goals enable row level security;
create policy "users manage own goals"
  on nutrition_goals for all using (auth.uid() = user_id);
