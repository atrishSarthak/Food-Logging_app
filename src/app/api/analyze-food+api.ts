import { visionModel, FOOD_EXTRACTION_PROMPT } from '@/lib/gemini';
import { createClient } from '@supabase/supabase-js';
import type { AIAnalysisResult, EnrichedAIItem } from '@/types/food';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    // 1. Call Gemini vision
    const result = await visionModel.generateContent([
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64,
        },
      },
      FOOD_EXTRACTION_PROMPT,
    ]);

    const analysis: AIAnalysisResult = JSON.parse(result.response.text());

    // 2. Cross-reference each detected item against Supabase food DB
    const enriched: EnrichedAIItem[] = await Promise.all(
      analysis.items.map(async (item) => {
        // Try to find in verified food DB using trigram similarity
        const { data: dbMatch } = await supabase
          .from('foods')
          .select('*')
          .or(
            `name.ilike.%${item.dish}%,name_local.ilike.%${item.dish_local ?? item.dish}%`
          )
          .order('verified', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (dbMatch) {
          // Scale IFCT/verified macros to the AI-estimated portion
          const ratio = item.portion_g / dbMatch.serving_size_g;
          return {
            ...item,
            dbMatch,
            finalCalories: Math.round(dbMatch.calories * ratio),
            finalProtein: Math.round(dbMatch.protein_g * ratio),
            finalCarbs: Math.round(dbMatch.carbs_g * ratio),
            finalFat: Math.round(dbMatch.fat_g * ratio),
            source: 'ifct' as const,
          };
        }

        // No DB match — use AI estimate directly
        return {
          ...item,
          dbMatch: undefined,
          finalCalories: item.calories_est,
          finalProtein: item.protein_est,
          finalCarbs: item.carbs_est,
          finalFat: item.fat_est,
          source: 'ai_estimate' as const,
        };
      })
    );

    return Response.json({ ...analysis, items: enriched });
  } catch (error) {
    console.error('Food analysis error:', error);
    return Response.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
