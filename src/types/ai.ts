import { ScreenshotCategory } from "./screenshot";

export type AiScreenshotAnalysis = {
  title: string;
  summary: string;
  action: string;
  category: ScreenshotCategory;
};
