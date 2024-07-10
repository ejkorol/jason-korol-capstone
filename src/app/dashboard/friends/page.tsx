import MessageFeed from "@/app/dashboard/friends/MessageFeed";
import FriendsList from "@/app/dashboard/friends/FriendsList";
import StatusBar from "@/app/dashboard/friends/StatusBar";
import { getSession } from "@/lib/auth";

interface Friend {
  id: number;
  user_id: number;
  friend_id: number;
  status: string;
  first_name: string;
  username: string;
  updated_at: string;
  created_at: string;
}

async function fetchMessages() {
  try {
    const session = await getSession();
    const res = await fetch(`${process.env.API_URL}/users/${session.userId}/messages`, { cache: "no-cache" } );
    if (!res.ok) {
      throw new Error("Failed to fetch messages")
    };
    return res.json();
  } catch (err: any) {
    throw new Error("Failed to fetch messages")
  };
};

async function fetchFriends(): Promise<Friend[]> {
  try {
    const session = await getSession();
    const res = await fetch(`${process.env.API_URL}/users/${session.userId}/friends`, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error("Failed to fetch friends list");
    };
    return res.json()
  } catch (err: any) {
    throw new Error("Failed to fetch friends list");
  };
};

export default async function Friends() {

  const friends = await fetchFriends();
  const messages = await fetchMessages();

  return (
    <section className="flex flex-col w-full">
      <StatusBar>Messages</StatusBar>
      <MessageFeed messages={messages} />
      <FriendsList friends={friends} />
    </section>
  );
};
