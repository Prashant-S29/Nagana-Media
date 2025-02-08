import React from "react";
import { Button } from "~/components/ui/button";

// Components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { NavbarItems } from "./data";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-between border-b border-gray-500 bg-gradient-to-r from-[#0c1323] to-[#1e2f45] px-[350px] py-8">
      <Link href="/" className="text-white">
        Nagana Media
      </Link>

      <div className="flex items-center gap-2">
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

        <Button variant="brand">Let&apos;s Talk</Button>
      </div>
    </div>
  );
};
