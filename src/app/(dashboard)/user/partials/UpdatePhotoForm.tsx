"use client";

import { useEffect, useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import api from "@/lib/axios";
import Image from "next/image";

export default function UpdatePhotoForm() {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const uploaderRef = useRef(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/api/user");
        setProfilePhotoUrl(res.data.profile_photo_url);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      }
    };

    loadUser();
  }, []);

  const handleUpload = async (e: any) => {
    const file = e.files[0];
    const formData = new FormData();
    formData.append("photo", file);

    try {
      await api.post("/api/user/photo", formData);
      alert("Foto de perfil atualizada!");

      const res = await api.get("/api/user");
      setProfilePhotoUrl(res.data.profile_photo_url);
    } catch (err) {
      alert("Erro ao enviar foto");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Foto de Perfil</h2>

      <div className="flex flex-col md:flex-row">
        <FileUpload
          ref={uploaderRef}
          name="photo"
          customUpload
          uploadHandler={handleUpload}
          accept="image/*"
          chooseLabel="Selecionar Foto"
          mode="basic"
          className="w-full"
        />
        {profilePhotoUrl && (
          <div className="mb-4">
            <p>Foto atual:</p>
            {/* <Image
              src={profilePhotoUrl}
              alt="Foto de perfil"
              width={150}
              height={96}
            /> */}
            <img src={profilePhotoUrl} alt="Foto de perfil" className="w-80"/>
          </div>
        )}
      </div>
    </div>
  );
}
