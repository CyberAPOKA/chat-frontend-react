"use client";

import React, { useRef } from "react";
import LogoutButton from "@/components/Auth/LogoutButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

export default function Config() {
  const op = useRef(null);
  return (
    <div>
      <Button
        type="button"
        icon="pi pi-cog"
        onClick={(e) => op.current.toggle(e)}
      />
      <OverlayPanel ref={op}>
        <div className="flex flex-col gap-4">
          <LanguageSwitcher />
          <LogoutButton />
        </div>
      </OverlayPanel>
    </div>
  );
}
