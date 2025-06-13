"use client";

import avatar from "app/avatar.jpg";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site/config";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const menuItems = Object.entries(siteConfig.navigation) ?? [];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="h-20">
      <nav className="fixed top-5 inset-x-0 max-w-2xl z-20 px-2 w-full mx-auto">
        <div
          className={cn(
            "mx-auto px-6 transition-all duration-300 lg:px-12",
            "rounded-xl backdrop-blur-xl bg-background",
            { "bg-background/50 max-w-2xl border lg:px-3": isScrolled }
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-1 lg:gap-0 lg:py-2">
            <div className="flex w-full justify-between lg:w-auto">
              <Image
                src={avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map(([path, { name }]) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};
