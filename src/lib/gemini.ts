import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY!);

export const visionModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  generationConfig: {
    responseMimeType: 'application/json',
  },
});

export const FOOD_EXTRACTION_PROMPT = `
You are a nutrition expert analysing a meal photo for Calibre, an Indian fitness app.

Identify every distinct food item visible in the photo. For each item return structured data.

Important Indian portion references:
- Standard steel katori: 150–180g for dal/sabzi/curry
- Standard chapati/roti: 35–40g each
- Steel plate with rice: ~250–300g rice portion
- Idli (one piece): ~40–50g
- Dosa: ~100–120g
- Samosa (one piece): ~60–80g
- If you see a bowl next to a phone for scale, a phone is ~150g

Rules:
- Identify Indian dishes by their actual name (dal makhani, not "lentil curry")
- Include dish_local in Hindi/regional script where you know it
- Set confidence below 0.65 if the dish is ambiguous or obscured
- Estimate portion_g based on visual plate/bowl size and typical serving
- All macro estimates should be per the portion_g you estimated (not per 100g)

Return ONLY valid JSON matching this exact structure, no explanation text:
{
  "items": [
    {
      "dish": "Dal Makhani",
      "dish_local": "दाल मखनी",
      "portion_g": 180,
      "confidence": 0.92,
      "calories_est": 280,
      "protein_est": 11,
      "carbs_est": 35,
      "fat_est": 9
    }
  ],
  "meal_context": "lunch",
  "low_confidence_flag": false
}
`;
