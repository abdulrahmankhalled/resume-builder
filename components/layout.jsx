"use client";

import { Sidebar } from "./sidebar";

export function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-12 md:ml-24 p-6">{children}</main>
    </div>
  );
}
