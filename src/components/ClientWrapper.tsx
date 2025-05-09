"use client";

import "@/i18n";
import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
