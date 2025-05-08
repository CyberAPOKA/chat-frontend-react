"use client";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { getCookie } from "@/utils/cookies";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");

      const token = getCookie("XSRF-TOKEN");

      if (!token) {
        alert("Erro ao obter token CSRF.");
        return;
      }

      await api.post(
        "/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.confirmPassword,
        },
        {
          headers: {
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
        }
      );

      console.log("Cadastro realizado com sucesso");
      router.push("/");
    } catch (err: any) {
      console.error("Erro no registro:", err);
      alert("Erro ao registrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <span className="p-float-label">
        <InputText
          id="name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full"
        />
        <label htmlFor="name">Name</label>
      </span>

      <span className="p-float-label">
        <InputText
          id="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full"
        />
        <label htmlFor="email">Email</label>
      </span>

      <span className="p-float-label">
        <InputText
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="w-full"
        />
        <label htmlFor="password">Password</label>
      </span>

      <span className="p-float-label">
        <InputText
          id="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          className="w-full"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
      </span>

      <Button
        label="Registrar"
        icon="pi pi-user-plus"
        onClick={handleRegister}
      />
    </div>
  );
}
