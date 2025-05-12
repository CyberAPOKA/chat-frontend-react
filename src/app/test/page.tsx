"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function TestBroadcastingAuth() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testBroadcastAuth = async () => {
      try {
        const res = await api.get("/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("✅ broadcasting/auth/debug result:", res.data);
        setResult(res.data);
      } catch (err: any) {
        console.error("❌ broadcasting/auth/debug error:", err);
        setError(err.message || "Erro desconhecido");
      }
    };

    testBroadcastAuth();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teste de Broadcasting Auth</h1>

      {error && <p className="text-red-600">Erro: {error}</p>}

      {result ? (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
