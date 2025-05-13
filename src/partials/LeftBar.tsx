"use client";

import Link from "next/link";
import UpdateUser from "@/components/UpdateUser";
import Config from "@/partials/Config";

export default function LeftBar() {
  return (
    <div className="flex flex-col justify-between gap-y-4 w-16 bg-gray-400 p-2">
      <div className="flex flex-col gap-y-2 items-center mt-12">
        <Link
          href="/user"
          className="inline-flex flex-col items-center justify-center p-4 rounded-full hover:bg-gray-50"
        >
          <i className="pi pi-user"></i>
        </Link>
        <Link
          href="/"
          className="inline-flex flex-col items-center justify-center p-4 rounded-full hover:bg-gray-50"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1370/1370907.png"
            alt=""
          />
        </Link>
      </div>
      <div className="flex flex-col gap-y-4 items-center mb-20 md:mb-0">
        <Config />
      </div>
    </div>
  );
}
