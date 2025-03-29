import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

// data
import { NavbarItems } from "./data";

// Components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { MobileNav } from "../MobileNav";

export const Navbar: React.FC = () => {
  return (
    <div
      data-container
      className="absolute top-0 z-50 flex h-[100px] w-full items-center justify-between py-4 sm:py-8"
    >
      <Link href="/" className="text-white">
        Nagana Media
      </Link>

      <div className="flex items-center gap-2 max-[900px]:hidden">
        <nav className="flex items-center gap-5">
          <NavigationMenu>
            <NavigationMenuList>
              {NavbarItems.map((data, index) => (
                <div key={index}>
                  <NavigationMenuItem key={index}>
                    <Link href={data.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} bg-transparent font-normal text-white underline-offset-4 hover:bg-transparent hover:text-white hover:underline focus:bg-transparent focus:text-white focus:underline`}
                      >
                        {data.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <Button variant="brand" asChild>
          <Link href="/contact">Let&apos;s Talk</Link>
        </Button>
      </div>
      <nav className="hidden max-[900px]:block">
        <MobileNav />
      </nav>
    </div>
  );
};
