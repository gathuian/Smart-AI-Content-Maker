import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface VideoScene {
  visual: string;
  audio: string;
}

export interface BlogPost {
  title: string;
  seoKeywords: string[];
  introduction: string;
  subheadings: { title: string; content: string }[];
  conclusion: string;
  cta: string;
}

export interface ContentVariation {
  instagram: string;
  facebook: string;
  blog: BlogPost;
  hashtags: string;
  imagePrompt: string;
  videoScript: VideoScene[];
  productionBrief: string;
}

export interface MarketingCampaign {
  variations: ContentVariation[];
}

export async function generateMarketingContent(
  name: string,
  description: string,
  audience: string,
  tone: string,
  language: string = "English"
): Promise<MarketingCampaign> {
  const prompt = `
    Act as a professional marketing expert, creative director, and ad producer fluent in ${language}.
    Generate exactly 3 distinct marketing variations for this product in ${language}.
    
    Product Name: ${name}
    Description: ${description}
    Target Audience: ${audience || "General Audience"}
    Tone: ${tone}

    For each variation, generate:
    1. Instagram Caption: Engaging + short with emojis.
    2. Facebook Ad Copy: Persuasive + high-converting.
    3. A full SEO Blog Post:
       - Title: Catchy and SEO-focused.
       - SEO Keywords: 5 high-value terms.
       - Introduction: 100+ word compelling hook.
       - 3 detailed subheadings: Each with 150+ words of body content.
       - Conclusion: Summary of value.
       - CTA: Powerful action-oriented closing.
    4. SEO Hashtags: 10 relevant tags.
    5. AI Image Prompt: Detailed prompt for professional product/lifestyle photography.
    6. Video Production Suite:
       - Video Script: 6 distinct scenes with Visual (including camera angles/cues) and Audio (Dialogue/VO).
       - Production Brief: A detailed professional director's briefing covering desired mood, lighting, wardrobe, and key message points for the crew.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          variations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                instagram: { type: Type.STRING },
                facebook: { type: Type.STRING },
                blog: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    seoKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                    introduction: { type: Type.STRING },
                    subheadings: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          content: { type: Type.STRING }
                        },
                        required: ["title", "content"]
                      }
                    },
                    conclusion: { type: Type.STRING },
                    cta: { type: Type.STRING }
                  },
                  required: ["title", "seoKeywords", "introduction", "subheadings", "conclusion", "cta"]
                },
                hashtags: { type: Type.STRING },
                imagePrompt: { type: Type.STRING },
                videoScript: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      visual: { type: Type.STRING },
                      audio: { type: Type.STRING }
                    },
                    required: ["visual", "audio"]
                  }
                },
                productionBrief: { type: Type.STRING }
              },
              required: ["instagram", "facebook", "blog", "hashtags", "imagePrompt", "videoScript", "productionBrief"]
            }
          }
        },
        required: ["variations"],
      },
    },
  });

  return JSON.parse(response.text) as MarketingCampaign;
}
