"use client";

import { useTranslation } from "react-i18next";
import Config from "@/partials/Config";

export default function Settings() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">{t("settings")}</h1>
    </div>
  );
}
