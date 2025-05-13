"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Sidebar from "@/partials/Sidebar";
import ChatBox from "@/components/Chat/ChatBox";
import BottomNavigation from "@/partials/BottomNavigation";

type Message = {
  id: string;
  content: string;
  user_id: string;
  sent_at: string;
  user: {
    name: string;
    profile_photo_url?: string;
  };
};

export default function DirectConversation() {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const userRes = await api.get("/api/user");
        setCurrentUserId(userRes.data.id);

        const msgRes = await api.get(`/api/conversations/${id}/messages`);
        const formatted = msgRes.data.map((m: any) => ({
          ...m,
          sent_by_me: m.user_id === userRes.data.id,
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("Erro ao carregar conversa:", err);
      }
    };

    load();
  }, [id]);

  const handleSendMessage = async (text: string) => {
    try {
      const res = await api.post(`/api/conversations/${id}/messages`, {
        content: text,
      });

      setMessages((prev) => [
        ...prev,
        {
          ...res.data,
          sent_by_me: true,
        },
      ]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  return (
    <div>
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1">
          <ChatBox
            conversationId={id as string}
            currentUserId={currentUserId}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
