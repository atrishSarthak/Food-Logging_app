import { createClient } from '@supabase/supabase-js';
import type { Food } from '@/types/food';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const barcode = url.searchParams.get('barcode');

    if (barcode) {
      // Barcode lookup
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .eq('barcode', barcode)
        .maybeSingle();

      if (error) throw error;
      return Response.json({ results: data ? [data] : [] });
    }

    if (!query || query.length < 2) {
      return Response.json({ results: [] });
    }

    // Fuzzy search using trigram similarity
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .or(`name.ilike.%${query}%,name_local.ilike.%${query}%`)
      .order('verified', { ascending: false })
      .limit(20);

    if (error) throw error;

    return Response.json({ results: data as Food[] });
  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ error: 'Search failed' }, { status: 500 });
  }
}
