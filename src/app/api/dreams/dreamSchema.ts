import { z } from "zod";

export const dreamSchema = z.object({
  analysis: z.object({
    dream_title: z.string().describe("a short title to name the dream"),
    dream_analysis: z.string().describe("2 to 3 paragraphs of waht the dream could mean"),
    dream_tags: z.array(
      z.object({
        tag_name: z.string().describe("0 to 4 unique one word tags separated by commas to describe the main components of the dream")
      })
    ).max(5).describe("0-5 unique one word tags that describe the main components of the dream"),
    dream_symbols: z.array(
      z.object({
        symbol_name: z.string().describe("unique one word symbol that occurs within the dream"),
        symbol_analysis: z.string().describe("A detailed analysis in 255 characters or less of what the symbol means in the context of the dream and specifically to the user. What could this symbol mean in their waking world?")
      })
    ).max(5).describe("0-5 unique one word symbols that occur within the dream, along with their meaning")
  })
});
