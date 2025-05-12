"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");

      await api.post("/login", {
        email,
        password,
      });

      console.log("Login com sucesso");
      router.push("/");
    } catch (error) {
      console.error("Erro no login:", error);
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
