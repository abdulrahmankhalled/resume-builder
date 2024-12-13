"use client";

import { LayoutDashboard, Settings2, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Content",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings2,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 h-full w-fit items-center justify-center border-r bg-gray-50/40">
      <div className="flex h-full flex-col justify-between">
        <div className="px-3 py-4">
          <div className="space-y-1 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-fit justify-start flex-col h-auto gap-1 px-2",
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="md:block hidden text-xs font-medium">
                    {item.title}
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="p-3 mt-auto mx-auto">
          <Button
            variant="ghost"
            className="w-fit justify-center md:justify-start flex-col md:flex-row h-auto gap-1 px-2"
          >
            <User2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
