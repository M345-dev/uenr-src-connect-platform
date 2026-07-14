"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "#why", label: "Why Connect" },
  { href: "#experience", label: "Experience" },
  { href: "#accountability", label: "Accountability" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#103d2a]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="SRC Connect home">
          <Image src="/images/uenr-logo.png" alt="University of Energy and Natural Resources" width={180} height={48} className="h-8 w-auto" priority />
          <span className="hidden h-6 w-px bg-white/25 sm:block" />
          <span className="text-sm font-semibold tracking-tight">SRC Connect</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-white/70 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
            <Link href="/admin">Admin preview</Link>
          </Button>
          <Button asChild className="h-10 bg-[#f3c941] px-4 text-[#173526] hover:bg-[#f7d666]">
            <Link href="/connect">Open Connect <MoveUpRight /></Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-[#103d2a] text-white">
            <SheetHeader>
              <SheetTitle className="text-left text-white">SRC Connect</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 px-4" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href} className="rounded-xl px-4 py-3 text-base font-medium text-white/75 hover:bg-white/10 hover:text-white">
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
              <div className="my-3 h-px bg-white/15" />
              <SheetClose asChild><Link href="/admin" className="rounded-xl px-4 py-3 font-medium text-white/75">Admin preview</Link></SheetClose>
              <SheetClose asChild><Button asChild className="mt-2 h-11 bg-[#f3c941] text-[#173526]"><Link href="/connect">Open Connect</Link></Button></SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
