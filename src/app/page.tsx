"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useTranslation } from "react-i18next";
import { useI18nReady } from "@/hooks/useI18nReady";
import Sidebar from "@/partials/Sidebar";

export default function Home() {
  useAuthRedirect();
  const { t } = useTranslation();
  const i18nReady = useI18nReady();
  if (!i18nReady) return null;
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Sidebar />
      <div>
        <h1 className="text-3xl font-bold">{t("home.welcome")}</h1>
      </div>
    </div>
  );
}
