"use client";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { getCookie } from "@/utils/cookies";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");

      const token = getCookie("XSRF-TOKEN");

      if (!token) {
        console.error("CSRF token não encontrado no cookie.");
        alert("Erro ao obter token CSRF.");
        return;
      }

      await api.post(
        "/login",
        { email, password },
        {
          headers: {
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
        }
      );

      console.log("Login bem-sucedido");
      
      router.push("/");
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Login inválido");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="p-float-label">
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <label htmlFor="email">Email</label>
      </span>

      <span className="p-float-label">
        <InputText
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
        <label htmlFor="password">Senha</label>
      </span>

      <Button label="Entrar" icon="pi pi-sign-in" onClick={handleLogin} />
    </div>
  );
}
