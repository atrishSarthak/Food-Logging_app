import { createClient } from '@supabase/supabase-js';
import type { FoodLog } from '@/types/food';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    const logData = await request.json();

    const { data, error } = await supabase
      .from('food_logs')
      .insert(logData)
      .select('*, food:foods(*)')
      .single();

    if (error) throw error;

    return Response.json({ log: data as FoodLog });
  } catch (error) {
    console.error('Log meal error:', error);
    return Response.json({ error: 'Failed to log meal' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Missing log ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('food_logs')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error) {
    console.error('Delete log error:', error);
    return Response.json({ error: 'Failed to delete log' }, { status: 500 });
  }
}
