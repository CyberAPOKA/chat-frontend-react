"use client";

import { useTranslation } from "react-i18next";
import UpdateProfileForm from "./partials/UpdateProfileForm";
import UpdatePasswordForm from "./partials/UpdatePasswordForm";
import UpdatePhotoForm from "./partials/UpdatePhotoForm";

export default function User() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto mt-6 max-w-xl">
      <h1 className="text-3xl font-bold text-center mb-10">{t("user.data")}</h1>
      <UpdateProfileForm />
      <UpdatePasswordForm />
      <UpdatePhotoForm />
    </div>
  );
}
