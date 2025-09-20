
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully,
  // but for this project, we'll throw an error if the key is missing.
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateSynopsis = async (movieTitle: string): Promise<string> => {
  if (!API_KEY) {
    return "AI synopsis generation is currently unavailable. Please check your API key configuration.";
  }
  
  try {
    const prompt = `Generate a compelling and rich movie synopsis for the film titled "${movieTitle}". The synopsis should be engaging, about 3-4 sentences long, and capture the main plot points, character motivations, and the overall tone of the film. Do not include spoilers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating synopsis with Gemini API:", error);
    return "Could not generate AI synopsis at this time. Please try again later.";
  }
};
