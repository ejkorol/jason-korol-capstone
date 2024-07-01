import { z } from "zod";

export const dreamSchema = z.object({
  analysis: z.object({
    dream_title: z.string().describe("a short title to name the dream"),
    dream_analysis: z.string().describe("2 to 3 paragraphs of waht the dream could mean"),
    dream_tags: z.string().describe("0 to 4 unique one word tags separated by commas to describe the main components of the dream"),
    dream_symbols: z.string().describe("0 to 4 unique one word symbols separated by commas that occur within the dream")
  })
});
