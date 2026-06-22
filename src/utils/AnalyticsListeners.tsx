"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { track } from "./analytics";

/**
 * Site-wide journey listeners. Mounted once inside the PostHog provider so the
 * SEO/marketing team gets named events without sprinkling handlers everywhere:
 *
 *  - `cta_click`          — any element marked `data-cta="location|label"`.
 *  - `outbound_link_click`— any <a> that points to a different host (auto).
 *  - `scroll_depth`       — 25/50/75/100% milestones on the home page + blogs,
 *                           where read-through actually matters.
 *
 * Autocapture already records raw clicks; these add the clean, queryable names.
 */
export function AnalyticsListeners() {
  const pathname = usePathname();

  // ── Delegated click tracking: CTAs + outbound links ──────────────────────
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;

      // Explicit CTAs opt in via data-cta="location|label".
      const cta = el.closest<HTMLElement>("[data-cta]");
      if (cta) {
        const [location, label] = (cta.getAttribute("data-cta") ?? "").split(
          "|",
        );
        const anchor = cta.closest("a");
        track("cta_click", {
          location: location || undefined,
          label: label || cta.textContent?.trim().slice(0, 60) || undefined,
          href: cta.getAttribute("href") ?? anchor?.getAttribute("href") ?? undefined,
          path: pathname,
        });
      }

      // Any anchor leaving our host counts as an outbound click.
      const anchor = el.closest<HTMLAnchorElement>("a[href]");
      if (anchor) {
        try {
          const url = new URL(anchor.href, window.location.href);
          const external =
            (url.protocol === "http:" || url.protocol === "https:") &&
            url.hostname &&
            url.hostname !== window.location.hostname;
          if (external) {
            track("outbound_link_click", {
              href: url.href,
              host: url.hostname,
              label:
                anchor.textContent?.trim().slice(0, 60) ||
                anchor.getAttribute("aria-label") ||
                undefined,
              path: pathname,
            });
          }
        } catch {
          // Malformed href — ignore.
        }
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // ── Scroll depth (home + blog posts only) ────────────────────────────────
  useEffect(() => {
    const trackScroll = pathname === "/" || pathname.startsWith("/blogs/");
    if (!trackScroll) return;

    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();

    function onScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      for (const m of milestones) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("scroll_depth", { depth: m, path: pathname });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // catch short pages already past a milestone on load
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
