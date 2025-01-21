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
    <div className="flex items-center justify-between border-b border-gray-500 bg-gradient-to-r from-[#0c1323] to-[#1e2f45] px-[350px] py-8">
      <p className="text-white">Nagana Media</p>

      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-5">
          <NavigationMenu>
            <NavigationMenuList>
              {NavbarItems.map((data, index) => (
                <div key={index}>
                  <NavigationMenuItem key={index}>
                    <Link href={data.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} bg-transparent font-normal text-white hover:bg-transparent hover:text-white`}
                      >
                        {data.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* {session && <AdminProfile data={session} status={status} />} */}
        </nav>

        <Button variant="brand">Let&apos;s Talk</Button>
      </div>
    </div>
  );
};
