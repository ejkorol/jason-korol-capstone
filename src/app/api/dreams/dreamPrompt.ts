import db from "@/lib/db-instance";

export function dreamPrompt(context: string, userId: number) {
  const userDreamProfile = async () => await db("dreams").where({ id: userId });
  const astrologyProfile = async () => await db("users").where({ id: userId }).select("users.sun_sign", "users.moon_sign", "users.mbti");
  return ( `analyze this dream: provide a short title, what the dream means, tags related to the dream, and any symbols that appear:` + context + `use the context of past dreams of this user here to provide a personalized analysis that the user can relate to, and identify recurring symbols: ` + userDreamProfile + `use the zodiacs for their sun sign, moon sign, along with their mbti to create a hyper-personalized anaylsis: ` + astrologyProfile );
};
