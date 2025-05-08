"use client";

import { Button } from "primereact/button";
import api from "@/lib/axios";
import { getCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");

      const token = getCookie("XSRF-TOKEN");
      if (!token) {
        alert("Erro ao obter token CSRF para logout.");
        return;
      }

      await api.post(
        "/logout",
        {},
        {
          headers: {
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
        }
      );

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
