export type AiProvider = "mock" | "gemini" | "backend";

export const aiConfig = {
  provider: "mock" as AiProvider,
  geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  backendEndpoint: process.env.EXPO_PUBLIC_AI_BACKEND_ENDPOINT
};
