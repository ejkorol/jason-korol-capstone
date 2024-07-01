import db from "@/lib/db-instance";

const userDreamProfile = getUserDreams();

async function getUserDreams() {
  return await db('dreams').where({ id: 1 });
};

export function dreamPrompt(context: string) {
 return ( `analyze this dream: provide a short title, what the dream means, tags related to the dream, any symbols that appear:` + context + `use the context of past dreams of this user here to provide a personalized analysis that the user can relate to: ` + userDreamProfile )
};
