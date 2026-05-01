import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface MarketingContent {
  instagram: string;
  facebook: string;
  blog: string;
  hashtags: string;
  imagePrompt: string;
  videoScript: string;
}

export async function generateMarketingContent(
  name: string,
  description: string,
  audience: string,
  tone: string,
  language: string = "English"
): Promise<MarketingContent> {
  const prompt = `
    Act as a professional marketing expert, creative director, and ad producer fluent in ${language}.
    Generate a comprehensive marketing campaign for this product in ${language}:
    
    Product Name: ${name}
    Description: ${description}
    Target Audience: ${audience || "General Audience"}
    Tone: ${tone}

    Return:
    1. Instagram Caption (engaging + short with emojis)
    2. Facebook Ad Copy (persuasive and high-converting)
    3. Blog Paragraph (informative and SEO-friendly)
    4. SEO Hashtags (10 relevant tags)
    5. AI Image Prompt (A detailed prompt for generating a professional product photo or lifestyle image for this campaign)
    6. Video Script (A professional 30-60 second script for a TikTok/Reel or commercial, including visual cues [Visual] and spoken lines [Audio])
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          instagram: { type: Type.STRING },
          facebook: { type: Type.STRING },
          blog: { type: Type.STRING },
          hashtags: { type: Type.STRING },
          imagePrompt: { type: Type.STRING },
          videoScript: { type: Type.STRING },
        },
        required: ["instagram", "facebook", "blog", "hashtags", "imagePrompt", "videoScript"],
      },
    },
  });

  return JSON.parse(response.text) as MarketingContent;
}
