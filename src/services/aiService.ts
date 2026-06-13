import { AiScreenshotAnalysis } from "@/types/ai";
import { aiConfig } from "@/config/aiConfig";
import { parseAiResponse } from "@/utils/parseAiResponse";

export type AnalyzeScreenshotInput = {
  imageUri: string;
};

export type AiService = {
  analyzeScreenshot(input: AnalyzeScreenshotInput): Promise<AiScreenshotAnalysis>;
};

async function analyzeWithMock(
  input: AnalyzeScreenshotInput
): Promise<AiScreenshotAnalysis> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return parseAiResponse({
    title: "Saved screenshot",
    summary:
      "This screenshot appears to contain information the user may want to remember later.",
    action: "Review this screenshot.",
    category: "Other"
  });
}

async function analyzeWithGemini(
  _input: AnalyzeScreenshotInput
): Promise<AiScreenshotAnalysis> {
  throw new Error("Gemini analysis is intentionally not connected in Milestone 1.");
}

async function analyzeWithBackend(
  _input: AnalyzeScreenshotInput
): Promise<AiScreenshotAnalysis> {
  throw new Error("Backend analysis is not configured for this validation MVP.");
}

export const aiService: AiService = {
  analyzeScreenshot(input) {
    if (!input.imageUri) {
      throw new Error("Screenshot image is required.");
    }

    switch (aiConfig.provider) {
      case "mock":
        return analyzeWithMock(input);
      case "gemini":
        return analyzeWithGemini(input);
      case "backend":
        return analyzeWithBackend(input);
      default:
        return analyzeWithMock(input);
    }
  }
};
