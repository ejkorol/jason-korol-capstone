export function imagePrompt(context: string) {
  return (
    `Create an image of a surreal dreamscape where this is the description: ${context}. The scene should have a slightly surreal atmosphere, with elements that blend reality and fantasy. Use muted, soft colors to give the image a dreamy, ethereal quality. Ensure the overall composition feels otherworldly and slightly disjointed, evoking the mysterious nature of dreams.`
  )
};

export function symbolPrompt(context: string) {
  return (
    `Create a surreal image of this symbol that appears in my dreams: ${context}.`
  )
};
