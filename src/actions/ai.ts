'use server'
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });


export const generateCreativePrompt = async (userPrompt: string) => {

  const finalPrompt = `
    Create a coherent and relevant outline for the following prompt: ${userPrompt}.
    The outline should consist of at least 6 points, with each point written as a single sentence.
    Ensure the outline is well-structured and directly related to the topic. 
    Return the output in the following JSON format:
  
    {
      "outlines": [
        "Point 1",
        "Point 2",
        "Point 3",
        "Point 4",
        "Point 5",
        "Point 6"
      ]
    }
  
    Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.
    `

  try {
    const completion = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: finalPrompt,
          config:{
            responseMimeType: "application/json",
            responseSchema:{
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        outlines: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        }
                    }
                }
            }
          }
        });

    const responseContent = completion.text;
    if (responseContent) {
      try {
        const jsonResponse = JSON.parse(responseContent)
        console.log('🟢 JSON response:', jsonResponse[0])
        return { status: 200, data: jsonResponse[0]  };
      } catch (error) {
        console.error('Invalid JSON received:', responseContent, error)
        return { status: 500, error: 'Invalid JSON format received from AI' }
      }
    }
    return { status: 400, error: 'No content generated' }
  } catch (error) {
    console.error('🔴 ERROR', error)
    return { status: 500, error: 'Internal server error' }
  }
}
