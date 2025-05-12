"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import api from "@/lib/axios";

export default function UpdatePasswordForm() {
  const [current_password, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const handlePasswordChange = async () => {
    try {
      await api.put("/api/user/password", {
        current_password,
        password,
        password_confirmation,
      });
      alert("Senha alterada com sucesso!");
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (err) {
      alert("Erro ao alterar senha");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-6">Alterar Senha</h2>

      <div className="flex flex-col gap-6">
        <span className="p-float-label">
          <InputText
            id="current_password"
            type="password"
            value={current_password}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full"
          />
          <label htmlFor="current_password">Senha Atual</label>
        </span>

        <span className="p-float-label">
          <InputText
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <label htmlFor="password">Nova Senha</label>
        </span>

        <span className="p-float-label">
          <InputText
            id="password_confirmation"
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full"
          />
          <label htmlFor="password_confirmation">Confirmar Nova Senha</label>
        </span>

        <Button
          label="Alterar Senha"
          icon="pi pi-lock"
          onClick={handlePasswordChange}
        />
      </div>
    </div>
  );
}
