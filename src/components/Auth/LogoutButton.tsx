"use client";

import { Button } from "primereact/button";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");

      await api.post("/logout");

      router.push("/login");
    } catch (err) {
      console.error("Erro ao sair:", err);
      alert("Erro ao fazer logout.");
    }
  };

  return (
    <Button
      label="Sair"
      icon="pi pi-sign-out"
      className="p-button-danger"
      onClick={handleLogout}
    />
  );
}
