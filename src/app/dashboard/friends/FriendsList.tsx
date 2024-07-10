"use client";
import {
  Avatar,
  Spacer
} from "@nextui-org/react";

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

interface FriendsListProps {
  friends: Friend[]
}

export default function FriendsList({friends}: FriendsListProps ) {

  if (!friends) return (
    <section className="flex flex-col w-full h-full p-6">
      <h2 className="text-sm font-mono uppercase tracking-wide">friends list</h2>
      <div className="flex justify-center items-center h-[50%]">
        <p className="text-lg text-neutral-500">Friends not yet aquired...</p>
      </div>
    </section>
  )

  return (
    <section className="flex flex-col w-full p-6">
      <h2 className="text-sm font-mono uppercase tracking-wide">friends list</h2>
      <Spacer y={4}/>
      <div className="flex flex-col gap-4">
      {friends.map(friend => {
        return (
          <div className="flex gap-4 items-center" key={friend.id}>
            <Avatar size="md" radius="md"/>
            <div className="flex flex-col">
              <h4 className="text-md tracking-wide capitalize">{friend.first_name}</h4>
              <p className="text-md text-neutral-500">{`@${friend.username}`}</p>
            </div>
          </div>
        )
      })}
    </div>
    </section>
  );
};
