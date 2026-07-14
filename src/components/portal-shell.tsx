"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Home, LifeBuoy, Menu, Search, Settings, ShieldCheck, UsersRound, Vote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type PortalView = "home" | "community" | "support" | "voice";

const navItems: { id: PortalView; label: string; icon: typeof Home }[] = [
  { id: "home", label: "For you", icon: Home },
  { id: "community", label: "Community", icon: UsersRound },
  { id: "support", label: "Get support", icon: LifeBuoy },
  { id: "voice", label: "Your voice", icon: Vote },
];

interface PortalShellProps {
  active: PortalView;
  onNavigate: (view: PortalView) => void;
  children: React.ReactNode;
}

function PortalNavigation({ active, onNavigate, mobile = false }: { active: PortalView; onNavigate: (view: PortalView) => void; mobile?: boolean }) {
  return (
    <nav className={cn("space-y-1", mobile && "px-2")} aria-label="Student app navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors",
              active === item.id ? "bg-[#f3c941] text-[#173526]" : "text-white/62 hover:bg-white/8 hover:text-white",
            )}
          >
            <Icon className="size-5" />
            {item.label}
            {item.id === "support" && <span className="ml-auto grid size-5 place-items-center rounded-full bg-white/12 text-[10px]">2</span>}
          </button>
        );
      })}
    </nav>
  );
}

export function PortalShell({ active, onNavigate, children }: PortalShellProps) {
  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col bg-[#103d2a] px-4 py-5 text-white lg:flex">
        <Link href="/" className="flex h-11 items-center gap-3 px-2" aria-label="SRC Connect home">
          <Image src="/images/uenr-logo.png" alt="UENR" width={175} height={46} className="h-8 w-auto" priority />
        </Link>
        <div className="my-6 h-px bg-white/10" />
        <p className="eyebrow mb-3 px-3 text-white/36">Student space</p>
        <PortalNavigation active={active} onNavigate={onNavigate} />
        <div className="mt-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#f3c941]"><ShieldCheck className="size-4" /><span className="text-xs font-bold">Verified student</span></div>
            <p className="mt-2 text-xs leading-5 text-white/48">Your UENR profile shapes what appears in your feed.</p>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl p-2">
            <Avatar className="size-9"><AvatarFallback className="bg-[#f3c941] text-xs font-bold text-[#173526]">KA</AvatarFallback></Avatar>
            <div className="min-w-0"><p className="truncate text-sm font-semibold">Kwame Agyeman</p><p className="truncate text-[11px] text-white/45">Engineering · Level 300</p></div>
            <Settings className="ml-auto size-4 text-white/45" />
          </div>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur-xl">
          <div className="flex h-17 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <Sheet>
              <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation"><Menu /></Button></SheetTrigger>
              <SheetContent side="left" className="w-[290px] border-0 bg-[#103d2a] text-white">
                <SheetHeader><SheetTitle className="text-left text-white">SRC Connect</SheetTitle></SheetHeader>
                <PortalNavigation active={active} onNavigate={onNavigate} mobile />
                <div className="mx-4 mt-5 rounded-2xl border border-white/10 p-4 text-xs leading-5 text-white/55">Personalized for School of Engineering · Level 300</div>
              </SheetContent>
            </Sheet>
            <div className="relative hidden max-w-md flex-1 sm:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="h-10 rounded-xl border-0 bg-muted pl-9 shadow-none" placeholder="Search updates, opportunities, services…" aria-label="Search SRC Connect" />
            </div>
            <Badge variant="secondary" className="ml-auto hidden sm:flex">Sunyani campus</Badge>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
            </Button>
            <Avatar className="size-9 sm:hidden"><AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">KA</AvatarFallback></Avatar>
          </div>
        </header>

        <main className="mx-auto min-h-[calc(100vh-68px)] max-w-[1440px] px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-12">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-2xl border bg-white/95 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl lg:hidden" aria-label="Mobile student app navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return <button type="button" key={item.id} onClick={() => onNavigate(item.id)} className={cn("flex min-h-13 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold", active === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground")}><Icon className="size-4.5" />{item.label}</button>;
        })}
      </nav>
    </div>
  );
}
