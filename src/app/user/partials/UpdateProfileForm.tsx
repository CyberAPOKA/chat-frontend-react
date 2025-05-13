"use client";

import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import api from "@/lib/axios";
import { InputMask } from "primereact/inputmask";

export default function UpdateProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      const res = await api.get("/api/user");
      setForm({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone || "",
      });
    };
    loadUser();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put("/api/user", form);
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar dados");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-6">Dados Pessoais</h2>

      <div className="flex flex-col gap-6">
        <span className="p-float-label">
          <InputText
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full"
          />
          <label htmlFor="name">Nome</label>
        </span>

        <span className="p-float-label">
          <InputText
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full"
          />
          <label htmlFor="email">Email</label>
        </span>

        <span className="p-float-label">
          <InputMask
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            mask="99 9 9999 9999"
            placeholder="99-999999"
            className="w-full"
          />
          <label htmlFor="phone">Telefone</label>
        </span>

        <Button label="Salvar" icon="pi pi-save" onClick={handleUpdate} />
      </div>
    </div>
  );
}
