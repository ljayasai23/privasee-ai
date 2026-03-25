import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { TechnicalData, AIAnalysis } from "../models/PrivacyReport";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY || "",
});

export async function analyzePrivacyData(techData: TechnicalData): Promise<AIAnalysis> {
  const prompt = `Translate these technical tracking scripts, cookies, and security headers into a 'Privacy Story' for a non-technical user. Grade the site from A to F based on its privacy practices.
  
  Data:
  URL: ${techData.targetUrl}
  Headers: ${JSON.stringify(techData.securityHeaders, null, 2)}
  Cookies: ${JSON.stringify(techData.cookies, null, 2)}
  Scripts: ${JSON.stringify(techData.scripts, null, 2)}
  
  Respond in JSON format with exactly these fields:
  - grade: "A" | "B" | "C" | "D" | "F"
  - privacyStory: A short, engaging 2-to-3 sentence explanation of what they are doing with the user's data.
  - creepinessReport: An array of strings explaining the riskiest trackers or cookies found.
  - securityArmor: A short sentence summarizing their security headers.
  `;

  try {
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: prompt,
    });

    // Clean up markdown formatting if the model returns ```json ... ```
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText) as AIAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      grade: "N/A",
      privacyStory: "Failed to parse AI response. Please check the API key.",
      creepinessReport: ["Could not format report."],
      securityArmor: "Analysis failed."
    };
  }
}
