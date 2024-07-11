"use client";

import {
  Avatar,
  Button,
  Input
} from "@nextui-org/react";

import StatusBar from "@/app/dashboard/friends/StatusBar";
import ButtonNavigation from "@/app/dashboard/friends/ButtonNavigation";
import SearchIcon from "@/app/icons/SearchIcon";
import { toast } from "react-hot-toast";

import { getSession } from "@/lib/auth";

import { useState, useEffect } from "react";

export default function Requests() {
  const [query, setQuery] = useState("");
  const [friends, setFriends] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [session, setSession] = useState<any>(null);

  async function fetchFriends() {
    const session = await getSession();
    setSession(session);
    const res = await fetch(`http://localhost:3000/api/users/${session.userId}/friends`);
    const json = await res.json();
    console.log(json);
    setFriends(json.filter((friend: any) => friend.status === "pending"));
  }

  async function handleSearch() {
    const session = await getSession();
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    const res = await fetch(`http://localhost:3000/api/users/${session.userId}/search/${query}`);
    const json = await res.json();
    setSearchResults(json);
  }

  async function handleAddFriend(friendId: number) {
    const existingFriend = friends.find(
      (friend: any) =>
        (friend.friend_id === friendId || friend.user_id === friendId) &&
        (friend.status === "pending" || friend.status === "accepted")
    );

    if (existingFriend) {
      toast.error("Friend request is already pending.");
      return;
    }

    const res = await fetch(`http://localhost:3000/api/users/${session.userId}/friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ friend_id: friendId }),
    });
    if (res.ok) {
      fetchFriends();
      toast.success("Request sent!");
    }
  }

  async function handleAction(friendId: number, action: 'accept' | 'decline') {
    const friendRequest = friends.find((friend: any) => friend.friend_id === friendId);

    if (!friendRequest) {
      toast.error("Friend request not found.");
      return;
    };

    if (friendRequest.user_id === session.userId) {
      toast.error("You cannot accept or decline your own request.");
      return;
    };

    const res = await fetch(`http://localhost:3000/api/users/${session.userId}/friends`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ friend_id: friendId, action }),
    });

    if (res.ok) {
      toast.success(`Friend request ${action}ed`)
      fetchFriends();
    } else {
      const error = await res.json();
      toast.error(error.message);
    };
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <section className="flex flex-col w-full">
      <StatusBar>Requests</StatusBar>
      <section className="pl-6 pr-6">
        <Input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          startContent={<SearchIcon size={20} stroke={1.5} />} 
          fullWidth 
          size="lg" 
          radius="lg" 
          placeholder="Search for friends"
        />
      </section>
      <ButtonNavigation />
      <section className="flex pl-6 pr-6 mt-6 flex-col gap-6">
        {friends.map((friend: any) => (
          <article key={friend.id} className="flex w-full items-center justify-between">
            <div className="flex gap-4 items-center">
              <Avatar size="lg" radius="lg" />
              <div>
                <p className="text-md capitalize">{friend.first_name}</p>
                <p className="text-sm text-neutral-500">{`@${friend.username}`}</p>
              </div>
            </div>
            <div className="flex gap-4">
              {friend.status === "pending" && (
                <>
                  <Button 
                    variant="light" 
                    color="danger" 
                    size="sm" 
                    radius="full"
                    onClick={() => handleAction(friend.friend_id, 'decline')}
                  >
                    Decline
                  </Button>
                  <Button 
                    variant="bordered" 
                    color="primary" 
                    size="sm" 
                    radius="full"
                    onClick={() => handleAction(friend.friend_id, 'accept')}
                  >
                    Accept
                  </Button>
                </>
              )}
            </div>
          </article>
        ))}
      </section>
      <section className="flex pl-6 pr-6 mt-6 flex-col gap-6">
        {searchResults.map((result: any) => (
          <article key={result.id} className="flex w-full items-center justify-between">
            <div className="flex gap-4 items-center">
              <Avatar size="lg" radius="lg" />
              <div>
                <p className="text-md capitalize">{result.first_name}</p>
                <p className="text-sm text-neutral-500">{`@${result.username}`}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="bordered" 
                color="primary" 
                size="sm" 
                radius="full"
                onClick={() => handleAddFriend(result.id)}
              >
                Send request
              </Button>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
