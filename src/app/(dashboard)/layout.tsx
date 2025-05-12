"use client";

import Sidebar from "@/partials/Sidebar";
import BottomNavigation from "@/partials/BottomNavigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useI18nReady } from "@/hooks/useI18nReady";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthRedirect();
  const i18nReady = useI18nReady();
  if (!i18nReady) return null;

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1">{children}</div>
      <BottomNavigation />
    </div>
  );
}
