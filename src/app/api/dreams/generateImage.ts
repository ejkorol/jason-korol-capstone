import { dalle } from "@/lib/dalle";

export default async function generateImage(context: string, promptGen: Function) {
  const prompt = promptGen(context);
  return await dalle(prompt);
};
