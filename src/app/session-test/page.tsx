"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function SessionTestPage() {
  const [sessionData, setSessionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await api.get("http://localhost:8000/session-test", {
          withCredentials: true,
        });
        setSessionData(response.data);
        console.log("✅ Session data:", response.data);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
        console.error("❌ Erro ao buscar sessão:", err);
      }
    };

    fetchSession();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teste de Sessão</h1>

      {error && <p className="text-red-600">Erro: {error}</p>}

      {sessionData ? (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(sessionData, null, 2)}
        </pre>
      ) : (
        <p>Carregando dados da sessão...</p>
      )}
    </div>
  );
}
