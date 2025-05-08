"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import LogoutButton from "@/components/Auth/LogoutButton";

export default function Home() {
  useAuthRedirect();

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Bem vindo ao painel</h1>
      <LogoutButton />
    </div>
  );
}
