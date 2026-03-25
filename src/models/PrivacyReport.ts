export interface TechnicalData {
  targetUrl: string;
  securityHeaders: Record<string, string>;
  cookies: {
    name: string;
    domain: string;
    expires: string;
  }[];
  scripts: string[];
}

export interface AIAnalysis {
  grade: "A" | "B" | "C" | "D" | "F" | "N/A";
  privacyStory: string;
  creepinessReport: string[];
  securityArmor: string;
}

export interface ScanResponse {
  raw: TechnicalData;
  analysis: AIAnalysis;
}
