"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useChatStore } from "@/store/chatStore";

type User = {
  id: string | number;
  name: string;
  email: string;
  profile_photo_url: string;
  last_message?: string;
  last_message_at?: string;
  conversation_id?: string;
  has_unread?: boolean;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { triggerRefresh, selectedConversationId } = useChatStore();

  const loadUsers = async () => {
    try {
      const res = await api.get("/api/conversations/recent");
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (!loading) loadUsers();
  }, [triggerRefresh]);

  const startConversation = async (userId: string | number) => {
    try {
      const res = await api.get(`/api/conversations/direct/${userId}`);
      router.push(`/direct/${res.data.conversation_id}`);
    } catch (err) {
      console.error("Erro ao iniciar conversa:", err);
    }
  };

  if (loading)
    return <p className="text-sm text-gray-500 px-4">Carregando...</p>;

  return (
    <div className="flex flex-col -mx-4 overflow-y-auto">
      {users.map((user) => (
        <div
          key={user.id}
          className={`flex gap-2 rounded-md p-4 cursor-pointer
    ${
      user.conversation_id === selectedConversationId
        ? "bg-blue-100"
        : "hover:bg-gray-200"
    }
  `}
          onClick={() => startConversation(user.id)}
        >
          <img
            src={user.profile_photo_url}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="truncate overflow-hidden text-ellipsis whitespace-nowrap">
            <p className="font-medium flex items-center gap-1">
              {user.name}
              {user.has_unread && (
                <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
              )}
            </p>
            <p className="text-xs text-gray-500">{user.last_message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
