"use client";

import avatar from "app/avatar.jpg";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site/config";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = Object.entries(siteConfig.navigation) ?? [];

interface MenuItem {
  path: string;
  name: string;
}

const MenuItem = ({ path, name }: MenuItem) => {
  return (
    <li key={path}>
      <Link
        href={path}
        className="text-muted-foreground hover:text-accent-foreground block duration-150"
      >
        <span>{name}</span>
      </Link>
    </li>
  );
};

export const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed top-5 max-w-2xl z-20 px-2 w-full"
      >
        <div
          className={cn(
            "mx-auto px-6 transition-all duration-300 lg:px-12",
            "rounded-xl backdrop-blur-xl bg-background",
            {
              "bg-background/50 max-w-2xl border lg:px-3":
                isScrolled,
            }
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
                  <MenuItem key={path} path={path} name={name} />
                ))}
              </ul>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
