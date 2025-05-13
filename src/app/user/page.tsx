"use client";

import { useTranslation } from "react-i18next";
import UpdateProfileForm from "./partials/UpdateProfileForm";
import UpdatePasswordForm from "./partials/UpdatePasswordForm";
import UpdatePhotoForm from "./partials/UpdatePhotoForm";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
export default function User() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="container mx-auto mt-6 max-w-xl p-4">
      <div className="flex items-center gap-4 mb-8">
        <Button icon="pi pi-arrow-left" onClick={() => router.back()} />
        <h1 className="text-3xl font-bold text-center">
          {t("user.data")}
        </h1>
      </div>
      <UpdateProfileForm />
      <UpdatePasswordForm />
      <UpdatePhotoForm />
    </div>
  );
}
