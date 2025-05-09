"use client";

import { useTranslation } from "react-i18next";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import i18n from "@/i18n";

type LanguageOption = {
  code: string;
  label: string;
};

const languages: LanguageOption[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function LanguageSwitcher() {
  const { i18n: i18nInstance } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<LanguageOption | null>(null);

  useEffect(() => {
    const current = i18nInstance.language;
    const found = languages.find((l) => l.code === current);
    setSelectedLang(found || languages[0]);
  }, [i18nInstance.language]);

  const handleChange = (lang: LanguageOption) => {
    i18n.changeLanguage(lang.code);
    localStorage.setItem("lang", lang.code);
    setSelectedLang(lang);
  };

  return (
    <Dropdown
      value={selectedLang}
      options={languages}
      onChange={(e) => handleChange(e.value)}
      optionLabel="label"
      placeholder="Idioma"
      className="w-full"
    />
  );
}
