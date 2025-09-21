

import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully,
  // but for this project, we'll throw an error if the key is missing.
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

// FIX: Conditionally initialize GoogleGenAI only if the API_KEY exists to prevent runtime errors.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateSynopsis = async (movieTitle: string): Promise<string> => {
  // FIX: Check if the 'ai' instance was successfully initialized.
  if (!ai) {
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
