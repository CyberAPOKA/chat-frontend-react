"use client";

import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import api from "@/lib/axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useChatStore } from "@/store/chatStore";

type Message = {
  id: string;
  content: string;
  sent_at: string;
  user_id: number;
  user: {
    id: number;
    name: string;
    profile_photo_url?: string;
  };
  sent_by_me?: boolean;
};

type ChatBoxProps = {
  conversationId: string;
};

export default function ChatBox({ conversationId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const user = useAuthUser();
  const pusherRef = useRef<Pusher | null>(null);
  const currentUserId = user?.id;
  const { refreshUserList, setSelectedConversationId } = useChatStore();
  const [conversationUser, setConversationUser] = useState<{
    id: number;
    name: string;
    profile_photo_url?: string;
  } | null>(null);

  useEffect(() => {
    if (conversationId) setSelectedConversationId(conversationId);
  }, [conversationId]);

  useEffect(() => {
    if (!currentUserId) return;

    const init = async () => {
      await loadMessages();
      await loadConversationUser();

      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        forceTLS: true,
      });

      pusherRef.current = pusher;

      const channelName = `chat.${conversationId}`;
      const channel = pusher.subscribe(channelName);

      channel.bind("pusher:subscription_succeeded", () => {
        console.log(`✅ Subscribed to channel: ${channelName}`);
      });

      channel.bind("App\\Events\\MessageSent", (data: Message) => {
        if (!data.id || messages.find((m) => m.id === data.id)) return;

        setMessages((prev) => [
          ...prev,
          {
            ...data,
            sent_by_me: data.user_id === currentUserId,
          },
        ]);
      });

      return () => {
        channel.unbind_all();
        pusher.unsubscribe(channelName);
      };
    };

    init();
  }, [conversationId, currentUserId]);

  const loadConversationUser = async () => {
    const res = await api.get(`/api/conversations/${conversationId}`);
    const otherUser =
      res.data.users.find((u: any) => u.id !== currentUserId) || null;
    setConversationUser(otherUser);
  };

  const loadMessages = async () => {
    const res = await api.get(`/api/conversations/${conversationId}/messages`);
    const sorted = res.data
      .sort(
        (a: Message, b: Message) =>
          new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
      )
      .map((m: Message) => ({
        ...m,
        sent_by_me: m.user_id === currentUserId,
      }));

    setMessages(sorted);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !pusherRef.current) return;

    const socketId = pusherRef.current.connection.socket_id;

    const res = await api.post(
      `/api/conversations/${conversationId}/messages`,
      { content: newMessage },
      {
        headers: {
          "X-Socket-ID": socketId,
        },
      }
    );

    setMessages((prev) => [
      ...prev,
      {
        ...res.data,
        sent_by_me: true,
      },
    ]);

    setNewMessage("");
    refreshUserList();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentUserId) return null;

  return (
    <div className="relative h-full flex flex-col md:ml-80 lg:ml-96 overflow-hidden">
  
      <div
        className="absolute inset-0 bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://static.whatsapp.net/rsrc.php/v4/yq/r/MHVytaGe3gh.png')",
          zIndex: 0,
        }}
      ></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="bg-white p-4 flex items-center gap-3 border-b">
          {conversationUser && (
            <>
              <img
                src={conversationUser.profile_photo_url}
                alt={conversationUser.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium text-lg">
                {conversationUser.name}
              </span>
            </>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sent_by_me ? "justify-end" : "justify-start"
              } mb-3`}
            >
              {!msg.sent_by_me && (
                <img
                  src={msg.user.profile_photo_url}
                  alt={msg.user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`px-4 py-2 rounded-xl ${
                  msg.sent_by_me
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.content}
              </div>
              {msg.sent_by_me && (
                <img
                  src={msg.user.profile_photo_url}
                  alt={msg.user.name}
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t px-4 py-3 flex items-center gap-2 bg-white">
          <InputText
            type="text"
            className="w-full"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            label=""
            severity="info"
            className="h-full"
            disabled={!newMessage}
          >
            <i className="pi pi-send rotate-45"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
