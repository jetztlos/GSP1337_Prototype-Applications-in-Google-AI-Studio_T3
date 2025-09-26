
import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary } from '../types';

const getApiKey = (): string => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
  }
  return apiKey;
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    city: { type: Type.STRING, description: "The name of the city for the itinerary." },
    country: { type: Type.STRING, description: "The country where the city is located." },
    days: {
      type: Type.ARRAY,
      description: "An array of 3 daily itinerary plans.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER, description: "The day number (1, 2, or 3)." },
          theme: { type: Type.STRING, description: "A creative theme for the day's activities (e.g., 'Historical Heartbeat', 'Modern Marvels & Culinary Quests')." },
          activities: {
            type: Type.ARRAY,
            description: "A list of activities for the day.",
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Suggested time for the activity (e.g., '9:00 AM - 11:00 AM')." },
                description: { type: Type.STRING, description: "A concise description of the activity." },
                location: { type: Type.STRING, description: "The name of the location or area for the activity." },
                details: { type: Type.STRING, description: "A brief, engaging detail about the activity, like a fun fact or a tip." },
              },
              required: ["time", "description", "location"],
            },
          },
        },
        required: ["day", "theme", "activities"],
      },
    },
  },
  required: ["city", "country", "days"],
};

export const generateItinerary = async (city: string): Promise<Itinerary> => {
  try {
    const prompt = `Create a detailed and exciting 3-day travel itinerary for the city of ${city}. The itinerary should be well-balanced, covering a mix of famous landmarks, local experiences, cultural sites, and culinary delights. Provide a creative theme for each day.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Basic validation to ensure the response matches the expected structure
    if (!parsedData.days || !Array.isArray(parsedData.days) || parsedData.days.length === 0) {
      throw new Error("Invalid itinerary format received from API.");
    }

    return parsedData as Itinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate itinerary. Gemini API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the itinerary.");
  }
};
