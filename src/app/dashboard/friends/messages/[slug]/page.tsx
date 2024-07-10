"use client";

import {
  Avatar,
  Input,
  Button,
  Spinner
} from "@nextui-org/react";

import { messagesAction } from "./messagesAction";
import sendMessageAction from "../../sendMessageAction";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getSession } from "@/lib/auth";

export default function Messages(){

  const params = useParams();
  const [ messages, setMessages ] = useState<any>();
  const [ message, setMessage ] = useState("");
  const [ session, setSession ] = useState<any>(null);

  async function fetchMessages() {
    const data = await messagesAction(params.slug);
    setMessages(data)
  };

  async function fetchSession() {
    const data = await getSession();
    setSession(data);
  };

  useEffect(() => {
    fetchMessages();
    fetchSession();
  }, []);

  const handleSend = async () => {
    const formData = {
      recipientId: messages.recipient.id,
      message,
    }
    const sendMessageActionWithData = sendMessageAction.bind(null, formData);
    await sendMessageActionWithData();
    setMessage("");
    fetchMessages();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!messages) return <section className="h-[75vh] w-full flex items-center content-center justify-center"><Spinner color="default" size="lg"/></section>

  return (
    <section className="pl-6 pr-6 mb-[50%]">
      <div className="flex w-full items-center mb-10">
        <div className="flex gap-4 items-center">
            <Avatar size="lg" radius="md" />
          <div>
            <h3 className="text-lg capitalize">{messages.recipient.name}</h3>
            <p className="text-sm text-neutral-500">{`@${messages.recipient.username}`}</p>
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-6">
        {session && messages.messages.map((message: any) => {
          const isOwnMessage = message.sender_id === session.userId;
          return (
            <div
              key={message.message_id}
              className={`flex gap-4 ${isOwnMessage ? 'justify-end' : ''}`}
            >
              <div className={`flex gap-4 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                <Avatar size="md" radius="lg" />
                <div className={`flex flex-col ${isOwnMessage ? 'items-end' : ''}`}>
                  <p className="text-neutral-500 tracking-wide">{`@${message.sender_username}`} ∘ <span className="text-xs font-mono text-neutral-500">{formatTime(message.created_at)}</span></p>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          )
        })}
      </section>
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-sm">
        <div className="flex gap-4 pl-6 pr-6 mb-[25%] mt-[5%]">
          <Input size="md" placeholder="Send a message" value={message} onChange={(e: any) => setMessage(e.target.value)} />
          <Button onClick={handleSend} color="primary">send</Button>
        </div>
      </div>
    </section>
  );
};
