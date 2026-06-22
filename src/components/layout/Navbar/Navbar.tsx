import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { NavbarItems } from "./data";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { MobileNav } from "../MobileNav";
import Image from "next/image";
import { logo } from "public/assets/static";

export const Navbar: React.FC = () => {
  return (
    <div
      data-container
      className="absolute top-0 z-50 flex h-[100px] w-full items-center justify-between py-4 sm:py-8"
    >
      <Link href="/" className="text-white">
        <Image src={logo} alt="Nagana Media logo" width={120} height={50} priority />
      </Link>
      <div className="flex items-center gap-2 max-[900px]:hidden">
        <nav className="flex items-center gap-5">
          <NavigationMenu>
            <NavigationMenuList>
              {NavbarItems.map((data, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={data.href}
                    className={`${navigationMenuTriggerStyle()} bg-transparent font-normal text-white underline-offset-4 hover:bg-transparent hover:text-white hover:underline focus:bg-transparent focus:text-white focus:underline`}
                  >
                    {data.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <Button variant="brand" asChild>
          <Link href="/contact" data-cta="navbar|Let's Talk">
            Let&apos;s Talk
          </Link>
        </Button>
      </div>
      <nav className="hidden max-[900px]:block">
        <MobileNav />
      </nav>
    </div>
  );
};
