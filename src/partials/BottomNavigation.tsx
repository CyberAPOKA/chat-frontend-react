"use client";

import Link from "next/link";

export default function BottomNavigation() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
        <Link
          href="/"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <i className="pi pi-home"></i>
          <span className="text-sm text-gray-500 group-hover:text-blue-600">
            Conversas
          </span>
        </Link>
        <Link
          href="/settings"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <i className="pi pi-cog"></i>
          <span className="text-sm text-gray-500 group-hover:text-blue-600">
            Settings
          </span>
        </Link>
      </div>
    </div>
  );
}
