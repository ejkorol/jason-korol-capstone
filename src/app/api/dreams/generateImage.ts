import { dalle } from "@/lib/dalle";
import { imagePrompt } from "./imagePrompt";

export default async function generateImage(context: string) {
  const prompt = imagePrompt(context);
  return await dalle(prompt);
};
