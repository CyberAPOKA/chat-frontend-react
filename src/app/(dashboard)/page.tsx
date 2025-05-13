"use client";

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="hidden md:flex flex-col items-center justify-between h-screen text-center gap-20 py-20 md:ml-80 lg:ml-96">
      <img src="/chat-image.png" alt="" className="w-96" />
      <div className="flex flex-col items-center">
        <img
          src="https://pages.greatpages.com.br/www.toolzz.com.br-home/1746818628/imagens/desktop/386227_1_171536781714080857.svg"
          alt="Logo"
          className="w-32 mb-4"
        />
        <p className="text-lg font-bold">{t("home.welcome")}</p>
        <p className="text-sm text-gray-500">{t("home.description")}</p>
      </div>
      <p className="flex gap-2 items-center">
        <i className="pi pi-lock"></i>
        {t("home.protected")}
      </p>
    </div>
  );
}
