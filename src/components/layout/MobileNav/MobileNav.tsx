"use client";

import React from "react";
import Link from "next/link";

// icons
import { MenuIcon } from "~/icons";

// components
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { NavbarItems } from "../Navbar/data";

export const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger
        asChild
        className="hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white"
      >
        <Button variant="ghost" size="icon" className="text-white">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Nagana Media</SheetTitle>
          <VisuallyHidden>
            <SheetDescription></SheetDescription>
          </VisuallyHidden>
        </SheetHeader>

        <ul className="mt-3 flex flex-col gap-3">
          {NavbarItems.map((data, index) => (
            <li key={index}>
              <Link href={data.href} onClick={() => setIsOpen(false)}>
                {data.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};
