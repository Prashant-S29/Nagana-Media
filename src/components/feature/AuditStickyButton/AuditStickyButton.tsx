"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export const AuditStickyButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after the hero fold leaves viewport; hide once the form is visible
    const hero = document.querySelector("[data-hero]") as HTMLElement | null;
    const form = document.getElementById("audit-form") as HTMLElement | null;

    if (!hero || !form) return;

    const observer = new IntersectionObserver(
      () => {
        const heroGone = !isInViewport(hero);
        const formVisible = isInViewport(form);
        setVisible(heroGone && !formVisible);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    observer.observe(form);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Button
        variant="brand"
        asChild
        className="shadow-lg shadow-brand/30 ring-2 ring-brand/20"
      >
        <Link href="#audit-form">Request My Free Audit</Link>
      </Button>
    </div>
  );
};

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}
