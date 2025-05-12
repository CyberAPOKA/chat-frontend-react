"use client";

import React, { useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { useRouter } from "next/navigation";

export default function UpdateUser() {
  const router = useRouter();
  const items = [
    {
      label: "Add",
      icon: "pi pi-pencil",
      command: () => {
        router.push("/fileupload");
      },
    },
    {
      label: "Update",
      icon: "pi pi-user",
      command: () => {
        router.push("/fileupload");
      },
    },
  ];
  return (
    <SpeedDial
      model={items}
      direction="right"
      style={{ position: "relative" }}
    />
  );
}
