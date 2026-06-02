"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ChartNoAxesCombined, GraduationCap, Moon, Search, Sparkles, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { coModules } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/", label: "Dashboard", icon: ChartNoAxesCombined },
  { href: "/register", label: "Register", icon: GraduationCap },
  { href: "/timetable", label: "Timetable", icon: CalendarDays }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-12 top-24 h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
        <div className="absolute right-28 top-40 h-2 w-2 rounded-full bg-emerald-300/60" />
        <div className="absolute bottom-24 left-1/3 h-1 w-1 rounded-full bg-amber-300/80" />
      </div>
      <nav className="sticky top-0 z-40 border-b bg-background/76 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">AI Smart Timetable Generator</span>
              <span className="block text-xs text-muted-foreground">Premium university scheduling SaaS</span>
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {primaryLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button key={link.href} asChild variant={pathname === link.href ? "default" : "ghost"} size="sm">
                  <Link href={link.href}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </Button>
              );
            })}
            {coModules.map((module) => (
              <Button key={module.id} asChild variant={pathname === `/co/${module.id}` ? "default" : "ghost"} size="sm">
                <Link href={`/co/${module.id}`}>{module.id.toUpperCase()}</Link>
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </nav>
      <main className={cn("relative mx-auto max-w-7xl px-4 py-8")}>{children}</main>
      <div className="fixed bottom-4 right-4 no-print hidden items-center gap-2 rounded-lg border bg-background/90 px-3 py-2 text-xs shadow-lg backdrop-blur md:flex">
        <Search className="h-3.5 w-3.5" />
        Local mock data, no backend
      </div>
    </div>
  );
}
