import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function useAuthUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get("/api/user").then((res) => setUser(res.data));
  }, []);

  return user;
}