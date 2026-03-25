import { NextRequest, NextResponse } from "next/server";
import { scrapeWebsite } from "@/services/scraper";
import { analyzePrivacyData } from "@/services/gemini";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 1. Scrape the website for tracking scripts, cookies, headers
    const techData = await scrapeWebsite(url);

    // 2. Analyze the extracted data using Gemini
    const aiAnalysis = await analyzePrivacyData(techData);

    // 3. Return the modularized response
    return NextResponse.json({
      raw: techData,
      analysis: aiAnalysis
    });

  } catch (error) {
    console.error("Scan error:", error);
    return NextResponse.json({ error: "Failed to scan website." }, { status: 500 });
  }
}
