"use server";

import api from "@/lib/axios";

export async function isAuthenticated(): Promise<boolean> {
  try {
    console.log("call isAuthenticated");
    const res = await api.get("http://localhost:8000/api/user", {
      withCredentials: true,
    });

    console.log("res: ", res);

    return !!res.data?.id;
  } catch {
    return false;
  }}
