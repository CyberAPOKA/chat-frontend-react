"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function Home() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    status: "pending",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/task/create", form);
      setMessage(res.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erro ao criar a tarefa");
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Tarefa</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
          maxLength={30}
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
          maxLength={500}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="pending">Pendente</option>
          <option value="in_progress">Em progresso</option>
          <option value="completed">Concluída</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Criar
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </main>
  );
}
