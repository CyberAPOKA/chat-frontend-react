"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import UserList from "@/components/Chat/UserList";
import LeftBar from "./LeftBar";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* <div className="md:hidden p-4 flex justify-between items-center shadow-sm bg-white">
        <Button
          icon="pi pi-bars"
          className="p-button-text"
          onClick={toggleMenu}
          aria-label="Menu"
        />
        <h1 className="text-lg font-semibold">{t("home.welcome")}</h1>
      </div> */}

      <div className="md:hidden flex justify-between items-center shadow-sm bg-white">
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </div>

      <aside className="fixed hidden md:flex flex-row md:w-80 lg:w-96 h-screen bg-gray-100 border-r shadow-sm">
        <LeftBar />
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-xl font-bold mb-6">{t("home.welcome")}</h2>
          <UserList />
        </div>
      </aside>

      {/* {isOpen && (
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
              <LanguageSwitcher />
              <LogoutButton />
            </nav>
          </div>
          <div className="flex-1 bg-black opacity-50" onClick={toggleMenu} />
        </div>
      )} */}
    </>
  );
}
