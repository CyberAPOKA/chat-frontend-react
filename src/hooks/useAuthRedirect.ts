"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    api
      .get("/api/user")
      .then((user) => {
        console.log("user: ", user);
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);
}
