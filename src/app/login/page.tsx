"use client";

import Login from "@/components/Auth/Login";

export default function LoginPage() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Login />
    </div>
  );
}