"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import LogoutButton from "@/components/Auth/LogoutButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div className="md:hidden p-4 flex justify-between items-center shadow-sm bg-white">
        <Button
          icon="pi pi-bars"
          className="p-button-text"
          onClick={toggleMenu}
          aria-label="Menu"
        />
        <h1 className="text-lg font-semibold">{t("home.welcome")}</h1>
      </div>

      <aside className="hidden md:flex flex-col justify-between w-64 h-screen bg-gray-100 border-r shadow-sm p-4">
        <div>
          <h2 className="text-xl font-bold mb-6">{t("home.welcome")}</h2>
        </div>

        <div className="flex flex-col gap-4">
          <LanguageSwitcher />
          <LogoutButton />
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{t("home.welcome")}</h2>
              <Button
                icon="pi pi-times"
                className="p-button-text"
                onClick={toggleMenu}
                aria-label="Fechar"
              />
            </div>
            <nav className="flex flex-col gap-4">
              <LogoutButton />
            </nav>
            <LogoutButton />
          </div>
          <div className="flex-1 bg-black opacity-50" onClick={toggleMenu} />
        </div>
      )}
    </>
  );
}
