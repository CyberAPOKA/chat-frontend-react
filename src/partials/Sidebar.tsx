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

      <aside className="fixed flex flex-row w-full md:w-80 lg:w-96 h-screen bg-gray-100 md:border-r shadow-sm">
        <LeftBar />
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-xl font-bold mb-6">{t("home.welcome")}</h2>
          <UserList />
        </div>
      </aside>

    </>
  );
}
