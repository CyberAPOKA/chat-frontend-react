"use client";

import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-3xl font-bold">{t("settings")}</h1>
    </div>
  );
}
