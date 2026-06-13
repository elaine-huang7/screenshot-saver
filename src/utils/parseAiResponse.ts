import { AiScreenshotAnalysis } from "@/types/ai";
import { isScreenshotCategory } from "@/utils/categories";

export function parseAiResponse(raw: unknown): AiScreenshotAnalysis {
  if (!raw || typeof raw !== "object") {
    throw new Error("AI response was not an object.");
  }

  const value = raw as Record<string, unknown>;
  const title = value.title;
  const summary = value.summary;
  const action = value.action;
  const category = value.category;

  if (
    typeof title !== "string" ||
    typeof summary !== "string" ||
    typeof action !== "string" ||
    typeof category !== "string"
  ) {
    throw new Error("AI response was missing required string fields.");
  }

  if (!isScreenshotCategory(category)) {
    throw new Error("AI response returned an unsupported category.");
  }

  return {
    title,
    summary,
    action,
    category
  };
}
