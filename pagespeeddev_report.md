# naganamedia.com — PageSpeed Insights Full Audit Report

**Date:** March 17, 2026  
**Tool:** Google PageSpeed Insights (Lighthouse 13.0.1)  
**Goal:** Achieve 100/100 on Performance, Accessibility, Best Practices, and SEO  

---

## Current Scores

| Category | Desktop | Mobile | Target |
|---|---|---|---|
| Performance | 98 | 86 | 100 |
| Accessibility | 79 | 87 | 100 |
| Best Practices | 96 | 96 | 100 |
| SEO | 85 | 85 | 100 |

---

## Table of Contents

1. [Performance Issues](#1-performance-issues)
2. [Accessibility Issues](#2-accessibility-issues)
3. [Best Practices Issues](#3-best-practices-issues)
4. [SEO Issues](#4-seo-issues)
5. [Extra Recommendations](#5-extra-recommendations-to-reach-100)

---

## 1. Performance Issues

### 1.1 LCP Image Has Wrong Loading Attributes

**Affects:** Desktop (heroImage) + Mobile (whatWeDoImage)  
**Impact:** Critical — responsible for most of the LCP regression  

**Problem:**  
Both the desktop and mobile LCP elements are Next.js `<Image>` components that have been left with `loading="lazy"` and no `fetchpriority` hint. This causes the browser to discover the image late in the loading waterfall, creating a **resource load delay of 630ms on desktop and 1,340ms on mobile** before the image even begins downloading.

LCP breakdown for desktop (`heroImage`):
- Time to first byte: 0ms
- Resource load delay: **630ms** ← caused by lazy loading
- Resource load duration: 700ms
- Element render delay: 30ms

LCP breakdown for mobile (`whatWeDoImage`):
- Time to first byte: 0ms
- Resource load delay: **1,340ms** ← caused by lazy loading
- Resource load duration: 340ms
- Element render delay: 30ms

**File locations:**
- Desktop LCP: `src/components/feature/Hero/Hero.tsx` — the `heroImage`
- Mobile LCP: `src/components/feature/WhatWeDo/WhatWeDo.tsx` — the `whatWeDoImage`

**Fix:**

In `Hero.tsx`, find the heroImage and change:
```tsx
// BEFORE
<Image
  alt="heroImage"
  src={heroImage}
  loading="lazy"
  width={600}
  height={600}
  className="w-full object-cover"
/>

// AFTER
<Image
  alt="heroImage"
  src={heroImage}
  priority          // sets fetchpriority="high" and removes lazy loading
  width={600}
  height={600}
  className="w-full object-cover"
/>
```

In `WhatWeDo.tsx`, find the whatWeDoImage and apply the same change:
```tsx
// BEFORE
<Image
  alt="whatWeDoImage"
  src={whatWeDoImage}
  loading="lazy"
  width={600}
  height={600}
  className="w-full object-cover"
/>

// AFTER
<Image
  alt="whatWeDoImage"
  src={whatWeDoImage}
  priority
  width={600}
  height={600}
  className="w-full object-cover"
/>
```

> **Note:** In Next.js, using the `priority` prop is the correct way to handle above-the-fold images. It automatically adds `fetchpriority="high"`, removes lazy loading, and adds a `<link rel="preload">` to the document head. Never use `priority` on more than 2–3 images per page as it will hurt other metrics.

**Expected gain:** Mobile LCP from 4.2s → ~2.5s. Desktop LCP already good at 1.0s but will improve further.

---

### 1.2 Render-Blocking CSS Requests

**Affects:** Desktop (210ms savings) + Mobile (540ms savings)  
**Impact:** High — delays First Contentful Paint and LCP  

**Problem:**  
Two CSS chunks are blocking the initial render of the page:
- `chunks/d33c20b6a4b21442.css` — 8.6 KiB, 525ms on desktop / 640ms on mobile
- `chunks/ad0aaad9becdb438.css` — 1.9 KiB, 514ms on desktop / 622ms on mobile

These are part of Next.js's automatic CSS chunking but are sitting on the critical path.

**File:** `next.config.js`

**Fix:**

Enable CSS optimization in your Next.js config and ensure critical CSS is inlined:

```js
// next.config.js
// NOTE: This project uses "type": "module" in package.json, so next.config.js
// uses ES module export syntax (export default), not module.exports.
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true, // inlines critical CSS, defers the rest
  },
  // ... rest of your config
};

export default nextConfig;
```

> **Note:** `optimizeCss: true` uses `critters` under the hood to inline critical CSS and defer non-critical CSS. Install it if needed:
> ```bash
> npm install critters
> ```
> This project uses `npm@10.8.3` as the package manager — always use `npm install`, not `yarn` or `pnpm`.

Additionally, ensure your global CSS in `src/styles/globals.css` only contains truly critical styles. Move any styles that are only needed below the fold into separate component-level CSS modules.

---

### 1.3 PostHog Third-Party Scripts on Critical Path

**Affects:** Desktop + Mobile  
**Impact:** High — 132 KiB of blocking scripts, 650ms LCP savings from preconnect alone  

**Problem:**  
5 PostHog scripts are loading eagerly on every page load with very short cache TTLs (4h and 5m). They occupy the main thread for 40–48ms and block LCP discovery. No preconnect hints exist for the PostHog domains.

Scripts loading on critical path:
- `/static/posthog-recorder.js` — 89 KiB (4h cache)
- `/static/surveys.js` — 32 KiB (5m cache)
- `/static/dead-clicks-autocapture.js` — 6 KiB (4h cache)
- `/static/web-vitals.js` — 3 KiB (5m cache)
- `/config.js` — 1 KiB (5m cache)

**File:** `src/utils/postHogProvider.tsx`  
**Package:** `posthog-js@1.255.1` (already installed)

**Fix — Part A: Add preconnect hints**

In `src/app/(default)/layout.tsx`, add to the `<head>`:
```tsx
<head>
  <link rel="preconnect" href="https://us.i.posthog.com" />
  <link rel="preconnect" href="https://us-assets.i.posthog.com" />
  {/* existing head content */}
</head>
```

**Fix — Part B: Defer PostHog initialization until after TTI**

Update `src/utils/postHogProvider.tsx` to initialize PostHog only after the page is fully interactive:

```tsx
'use client';

// posthog-js@1.255.1 — already in package.json, no new install needed
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect, useState } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = () => {
      if (!initialized) {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
          capture_pageview: false,
          // v1.255.1: disable heavy optional features until needed
          disable_session_recording: false,
          loaded: () => setInitialized(true),
        });
      }
    };

    // Use requestIdleCallback to wait for browser idle time
    if ('requestIdleCallback' in window) {
      requestIdleCallback(init, { timeout: 3000 });
    } else {
      setTimeout(init, 3000);
    }
  }, []);

  if (!initialized) return <>{children}</>;

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
```

**Expected gain:** ~650ms LCP improvement on mobile from preconnect alone. Additional TBT improvement from deferred script execution.

---

### 1.4 Unused JavaScript — 185 KiB Savings

**Affects:** Desktop + Mobile  
**Impact:** High — inflates initial JS parse/execute time  

**Problem:**  
Two first-party JS chunks contain large amounts of unused code:
- `chunks/85e6ed1fa4093a86.js` — 127 KiB total, 77 KiB unused
- `chunks/1c9669fd87998ca9.js` — 69 KiB total, 26 KiB unused

PostHog also ships unused JS:
- `posthog-recorder.js` — 88 KiB total, 56 KiB unused
- `surveys.js` — 31 KiB total, 25 KiB unused

**Fix:**

1. Audit what is in those large chunks by running the Next.js bundle analyzer:

```bash
npm install @next/bundle-analyzer
```

In `next.config.js` — note this project uses `"type": "module"`, so use ESM syntax:
```js
// next.config.js
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your existing config
};

export default withBundleAnalyzer(nextConfig);
```

Run: `ANALYZE=true npm run build`

2. Use dynamic imports for components not needed on initial load. Based on the actual project structure:

```tsx
// src/app/(default)/page.tsx
import dynamic from 'next/dynamic';

// These components are below the fold — safe to lazy load
const Testimonial = dynamic(
  () => import('@/components/feature/Testimonial'),
  { ssr: false }
);

const FAQ = dynamic(
  () => import('@/components/feature/FAQ')
);

const CalendlyFormEmbed = dynamic(
  () => import('@/components/feature/CalendlyFormEmbbed/CalendlyFormEmbed'),
  { ssr: false }
);

const TagMarquee = dynamic(
  () => import('@/components/common/TagMarquee')
);
```

3. For PostHog's recorder and surveys (the biggest offenders), disable them if not actively used or conditionally load them:

```tsx
posthog.init(key, {
  disable_session_recording: process.env.NODE_ENV !== 'production',
  disable_surveys: true, // if not using PostHog surveys
});
```

---

### 1.5 Legacy JavaScript — 43 KiB Savings

**Affects:** Desktop + Mobile  
**Impact:** Medium  

**Problem:**  
The JS bundles include polyfills for methods that are natively supported in all modern browsers:
- `Array.prototype.at`
- `Array.prototype.flat` / `flatMap`
- `Object.fromEntries`
- `Object.hasOwn`
- `String.prototype.trimEnd` / `trimStart`
- `Math.trunc`

These are ES2019–ES2022 methods supported by 98%+ of browsers in use today.

**File:** `package.json` (add `browserslist` field) / `next.config.js`

**Fix:**

Add a `browserslist` field directly to the existing `package.json` (alongside the other top-level fields already there like `"scripts"`, `"dependencies"`, etc.):
```json
{
  "name": "nagana_media",
  "version": "0.1.0",
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions",
    "not dead",
    "> 0.5%"
  ]
}
```

Or create a `.browserslistrc` file at the project root:
```
last 2 Chrome versions
last 2 Firefox versions
last 2 Safari versions
last 2 Edge versions
not dead
> 0.5%
```

In `next.config.js`, explicitly enable modern JS output — remember ESM syntax since `"type": "module"` is set:
```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  // ...
};

export default nextConfig;
```

**Expected gain:** ~43 KiB reduction in JS bundle size.

---

### 1.6 Oversized Images — 83 KiB Savings (Desktop)

**Affects:** Desktop only  
**Impact:** Medium — LCP and FCP improvement  

**Problem:**  
5 images are being served at their full source resolution but displayed at much smaller dimensions:

| Image | Served size | Displayed size | Wasted |
|---|---|---|---|
| imageOne | 478×686 px | 247×355 px | 23 KiB |
| imageFour | 488×518 px | 252×268 px | 17.9 KiB |
| whyChooseUsImage | 573×583 px | 350×356 px | 14.9 KiB |
| imageTwo | 596×432 px | 361×261 px | 14.5 KiB |
| imageThree | 584×454 px | 398×310 px | 13 KiB |

**Files:** These images are in `src/components/feature/WhatWeDo/WhatWeDo.tsx` and `src/components/feature/WhyChooseUs/WhyChooseUs.tsx`.

**Fix:**

Add the `sizes` prop to every Next.js `<Image>` component so it requests the correctly-sized variant:

```tsx
// For a 2-column grid layout (each image ~50% of viewport width)
<Image
  alt="imageOne"
  src={imageOne}
  width={400}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
  className="w-full object-cover"
/>

// For a full-width image
<Image
  alt="whyChooseUsImage"
  src={whyChooseUs}
  width={600}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 900px) 600px, 600px"
  className="w-full object-cover"
/>
```

> **Rule of thumb:** The `sizes` prop should describe the actual CSS display width of the image at each breakpoint. Next.js uses this to generate and serve the correctly-sized image from its built-in image optimization pipeline.

---

### 1.7 No Preconnect Hints for Any External Origin

**Affects:** Desktop + Mobile  
**Impact:** Medium — saves 300–650ms per origin on first connection  

**Problem:**  
No `<link rel="preconnect">` hints exist for any third-party origin. The browser wastes time doing DNS lookup + TCP + TLS handshake for PostHog origins at the point they're first needed.

**Fix:**

In `src/app/(default)/layout.tsx`:
```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to PostHog (only needed if PostHog loads early) */}
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="preconnect" href="https://us-assets.i.posthog.com" />
        {/* dns-prefetch as fallback for browsers that don't support preconnect */}
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
        <link rel="dns-prefetch" href="https://us-assets.i.posthog.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

> Use a maximum of 4 preconnect hints. Too many will compete and hurt performance.

---

### 1.8 Short Cache Lifetimes on PostHog Assets

**Affects:** Desktop + Mobile  
**Impact:** Medium — affects repeat visits  

**Problem:**  
PostHog's CDN serves its scripts with very short cache TTLs:
- `surveys.js` and `web-vitals.js` — only **5 minutes**
- `posthog-recorder.js` and `dead-clicks-autocapture.js` — only **4 hours**

Users revisiting the site re-download 132 KiB on nearly every visit.

**Fix:**

This is controlled by PostHog's CDN and cannot be changed directly. The best mitigation is to **self-host PostHog's scripts** through your Next.js app's API routes or via a proxy, which lets you set your own cache headers.

Alternatively, in `next.config.js`, add headers and rewrites to proxy PostHog assets — using ESM syntax (required because `"type": "module"` is set in `package.json`):

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/ingest/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
};

export default nextConfig;
```

> **Note:** The project already has a `next-sitemap.config.cjs` file using CommonJS format — that file is fine as-is because it uses the `.cjs` extension explicitly. Only `next.config.js` needs to use ESM `export default` syntax.

Then update the PostHog init to use your proxy:
```tsx
posthog.init(key, {
  api_host: '/ingest',
  ui_host: 'https://us.posthog.com',
});
```

---

### 1.9 Critical Request Chain Depth

**Affects:** Desktop + Mobile  
**Impact:** Medium  

**Problem:**  
The critical request chain has a maximum latency of 640ms (mobile) / 525ms (desktop):
```
Initial Navigation (naganamedia.com)
  └── chunks/d33c20b6a4b21442.css (525ms)
  └── chunks/ad0aaad9becdb438.css (514ms)
```

These CSS files are discovered only after the HTML is downloaded and parsed, adding a full round-trip to the critical path.

**Fix:**

Use `<link rel="preload">` for the most critical CSS chunk in your layout:
```tsx
<head>
  <link
    rel="preload"
    href="/_next/static/css/d33c20b6a4b21442.css"
    as="style"
  />
</head>
```

> **Better long-term fix:** The `optimizeCss: true` config from issue 1.2 addresses this more robustly by inlining the critical CSS directly into the HTML.

---

### 1.10 Logo Image Has `loading="lazy"`

**Affects:** Desktop + Mobile  
**Impact:** Low-Medium — causes layout shift (CLS 0.003 on desktop)  

**Problem:**  
The logo image in the Navbar is using `loading="lazy"`, which causes it to be treated as an unsized image element during initial render, contributing to the desktop CLS score of 0.003.

**File:** `src/components/layout/Navbar/Navbar.tsx`

**Fix:**
```tsx
// Find the logo Image component and add priority
<Image
  alt="logo"
  src={logo}
  width={120}
  height={50}
  priority          // logo is always above the fold
  className="..."
/>
```

---

## 2. Accessibility Issues

### 2.1 Desktop Navigation List Structure Broken (Desktop only — biggest a11y issue)

**Affects:** Desktop only  
**Impact:** Critical — directly causes the 79 accessibility score  

**Problem:**  
The desktop navigation renders a `<ul>` element (from Radix UI's `NavigationMenu`) but the immediate children are `<div>` elements instead of `<li>` elements. This breaks the semantic HTML contract that screen readers rely on to announce and navigate lists.

Failing elements:
```html
<ul data-orientation="horizontal" class="group flex flex-1 list-none ...">
  <div>Services</div>    <!-- wrong: should be <li> -->
  <div>About Us</div>   <!-- wrong: should be <li> -->
  <div>Blogs</div>      <!-- wrong: should be <li> -->
</ul>
```

**File:** `src/components/layout/Navbar/Navbar.tsx` and `src/components/ui/navigation-menu.tsx`  
**Package:** `@radix-ui/react-navigation-menu@1.2.3` (already installed)

**Fix:**

In `src/components/ui/navigation-menu.tsx`, find the `NavigationMenuList` component and ensure it renders `<li>` wrappers:

```tsx
// In navigation-menu.tsx
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
```

Then in `Navbar.tsx`, ensure each nav item is wrapped in `NavigationMenuItem` (which renders an `<li>`):

```tsx
<NavigationMenuList>
  <NavigationMenuItem>          {/* renders <li> */}
    <NavigationMenuLink href="/services">Services</NavigationMenuLink>
  </NavigationMenuItem>
  <NavigationMenuItem>
    <NavigationMenuLink href="/about">About Us</NavigationMenuLink>
  </NavigationMenuItem>
  <NavigationMenuItem>
    <NavigationMenuLink href="/blogs">Blogs</NavigationMenuLink>
  </NavigationMenuItem>
</NavigationMenuList>
```

> Radix UI's `NavigationMenuItem` renders a `<li>` by default. If you are wrapping items in custom `<div>` containers, remove those wrappers and let `NavigationMenuItem` be the direct child of `NavigationMenuList`.

**Expected gain:** Fixing this alone should push the desktop accessibility score from 79 to ~92+.

---

### 2.2 Buttons Do Not Have Accessible Names

**Affects:** Desktop + Mobile  
**Impact:** High  

**Problem:**  
Multiple icon-only buttons have no accessible name, making them unusable for screen reader users. Identified elements:

- Mobile hamburger/close menu button in `MobileNav.tsx`
- A carousel or slider close button inside a content section
- The mobile nav trigger button in `Navbar.tsx`

**File:** `src/components/layout/MobileNav/MobileNav.tsx`, `src/components/layout/Navbar/Navbar.tsx`

**Fix:**

Add `aria-label` to all icon-only buttons:

```tsx
// Mobile nav trigger (in Navbar.tsx)
<SheetTrigger asChild>
  <button
    aria-label="Open navigation menu"
    className="inline-flex items-center justify-center ..."
  >
    <HamburgerIcon />
  </button>
</SheetTrigger>

// Close button (in MobileNav.tsx or Sheet component)
<SheetClose asChild>
  <button
    aria-label="Close navigation menu"
    className="inline-flex items-center justify-center ..."
  >
    <CloseIcon />
  </button>
</SheetClose>
```

For any carousel/slider buttons:
```tsx
<button aria-label="Next slide" className="...">
  <ChevronRightIcon />
</button>
<button aria-label="Previous slide" className="...">
  <ChevronLeftIcon />
</button>
```

---

### 2.3 LinkedIn Link Has No Discernible Name

**Affects:** Desktop + Mobile  
**Impact:** High  

**Problem:**  
The LinkedIn icon link in the footer or contact section has no accessible text. The link renders as an icon with no label, so screen readers announce it as "link" with no destination context.

**File:** `src/components/layout/Footer/Footer.tsx` or contact section

**Fix:**
```tsx
// BEFORE
<a
  href="https://www.linkedin.com/company/nagana-media-tech/posts/?feedView=all"
  target="_blank"
  className="inline-flex ..."
>
  <LinkedInIcon />
</a>

// AFTER
<a
  href="https://www.linkedin.com/company/nagana-media-tech/posts/?feedView=all"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Nagana Media on LinkedIn (opens in new tab)"
  className="inline-flex ..."
>
  <LinkedInIcon aria-hidden="true" />   {/* hide icon from screen readers */}
</a>
```

> Also add `rel="noopener noreferrer"` to all `target="_blank"` links for security.

---

### 2.4 Low Colour Contrast — `text-black/50` Used Everywhere

**Affects:** Desktop + Mobile  
**Impact:** High — affects dozens of elements across the page  

**Problem:**  
The Tailwind class `text-black/50` (rgba(0,0,0,0.5)) on a white background gives a contrast ratio of approximately **3.9:1**, which fails WCAG AA for normal text (requires 4.5:1) and fails for large text at smaller sizes.

Failing elements include:
- All service card description paragraphs
- "What we do" section body text
- Blog card dates and metadata
- "Choose what you need" section descriptions
- Organic growth section body copy

Additionally, the **"Let's Talk"** CTA button fails contrast (likely cyan text on a dark/coloured background).

**File:** Multiple — primarily in `src/components/feature/` components and `tailwind.config.ts`

**Fix — Global approach:**

In `tailwind.config.ts`, define a semantic colour alias:
```ts
theme: {
  extend: {
    colors: {
      'body-muted': '#6b7280',  // gray-500 — 4.6:1 contrast on white, passes AA
    },
  },
},
```

Then do a project-wide find-and-replace:
- Replace `text-black/50` → `text-body-muted` everywhere
- Replace `text-black/50` in Tailwind responsive variants as well (`sm:text-black/50` etc.)

For the "Let's Talk" button, check the button variant in `src/components/ui/button.tsx` and ensure the text-to-background contrast meets 4.5:1. If the button is cyan/teal with white text, lighten or darken the background as needed.

> Use the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify each colour combination.

---

### 2.5 "Learn More" Links Are Not Descriptive (also SEO)

**Affects:** Desktop + Mobile  
**Impact:** High for both accessibility and SEO  

**Problem:**  
6 links all use the text "Learn More" pointing to different destinations. Screen readers present a list of links to users; hearing "Learn More, Learn More, Learn More, Learn More, Learn More, Learn More" provides zero context about what each link does.

**Affected links:**
- `/services/marketing-enablement` → "Learn More"
- `/services/program-management` → "Learn More"
- `/services/sales-enablement` → "Learn More"
- `/blogs/surviving-the-ai-shift-2026` → "Learn More"
- `/blogs/microsoft_ignite_2025_recap` → "Learn More"
- `/blogs/ignite-2025-preview` → "Learn More"

**File:** `src/components/common/ServiceCard/ServiceCard.tsx`, `src/components/common/BlogCard/BlogCard.tsx`

**Fix Option A — Change link text directly:**
```tsx
// ServiceCard.tsx
<Link href={`/services/${slug}`}>
  Learn about {serviceName}
</Link>

// BlogCard.tsx
<Link href={`/blogs/${slug}`}>
  Read: {blogTitle}
</Link>
```

**Fix Option B — Use aria-label while keeping visual text:**
```tsx
<Link
  href={`/services/${slug}`}
  aria-label={`Learn more about ${serviceName}`}
>
  Learn More
</Link>
```

Option A is preferred as it benefits both SEO and accessibility.

---

### 2.6 Logo Image Has `loading="lazy"` — Unsized Image Element (CLS)

**Affects:** Desktop (CLS 0.003)  
**Impact:** Low — causes minor layout shift  

Already covered in **1.10** above. The logo, heroImage, and whatWeDoImage are all flagged as "unsized image elements" contributing to layout shift because lazy-loaded images don't reserve space until they load.

**Fix:** Use `priority` on the logo and LCP images as described in 1.1 and 1.10. Ensure all `<Image>` components have explicit `width` and `height` props so the browser can reserve space before the image loads.

---

## 3. Best Practices Issues

### 3.1 Browser Console Error — `llms.txt` Returns 404

**Affects:** Desktop + Mobile  
**Impact:** Medium — console errors indicate unresolved problems  

**Problem:**  
The site is requesting `/llms.txt` as part of Next.js router prefetching (`_rsc=1r34m`), but the server responds with `404 Not Found`. This error appears in the browser console and is flagged by Lighthouse.

Interestingly, the file `public/llms.txt` **does exist** in the project tree — so this is likely a deployment issue where the file hasn't been deployed, or a Next.js App Router RSC (React Server Component) conflict.

**Fix:**

1. Verify `public/llms.txt` is properly committed and deployed:
```bash
git status public/llms.txt
git add public/llms.txt
git commit -m "fix: ensure llms.txt is deployed"
```

2. If the 404 persists, check if Next.js App Router is intercepting the `/llms.txt` route. Add an explicit redirect or static route in `next.config.js`:
```js
async redirects() {
  return [];
},
async rewrites() {
  return [
    // Ensure /llms.txt serves the static file
    {
      source: '/llms.txt',
      destination: '/llms.txt',
    },
  ];
},
```

3. Also fix the **robots.txt** which references `llms.txt` with an unknown directive. Update `public/robots.txt` to use a valid format:
```
User-agent: *
Allow: /

Sitemap: https://www.naganamedia.com/sitemap.xml
```

Remove or correct the invalid `LLMs:` directive line.

---

### 3.2 No Content Security Policy (CSP) Header

**Affects:** Desktop + Mobile  
**Impact:** High severity security issue  

**Problem:**  
No `Content-Security-Policy` header is set in enforcement mode. This leaves the site vulnerable to cross-site scripting (XSS) attacks where malicious scripts can be injected into the page.

**File:** `next.config.js`

**Fix:**

Add security headers in `next.config.js` — using ESM `export default` syntax required by `"type": "module"`:

```js
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // posthog-js@1.255.1 requires unsafe-inline/eval for its recorder
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us-assets.i.posthog.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com",
      // CalendlyFormEmbed component (src/components/feature/CalendlyFormEmbbed/)
      "frame-src 'self' https://calendly.com",
    ].join('; '),
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

> **Important:** Start with a `Content-Security-Policy-Report-Only` header first to test without breaking anything, then switch to `Content-Security-Policy` once verified.

---

### 3.3 No Cross-Origin-Opener-Policy (COOP) Header

**Affects:** Desktop + Mobile  
**Impact:** High severity  

**Problem:**  
Missing `Cross-Origin-Opener-Policy` header means the window can be accessed by pop-up windows from other origins, creating a potential security vulnerability.

**Fix:**  
Already included in the CSP fix above (3.2):
```
Cross-Origin-Opener-Policy: same-origin
```

---

### 3.4 No Trusted Types Directive in CSP

**Affects:** Desktop + Mobile  
**Impact:** Medium  

**Problem:**  
Missing the `require-trusted-types-for` directive in the CSP, which would prevent DOM-based XSS attacks.

**Fix:**  
If you are not using any direct DOM manipulation (`innerHTML`, `document.write`, etc.), add to the CSP:
```
require-trusted-types-for 'script'
```

If PostHog or other third-party scripts use DOM APIs, this may require testing before enforcement.

---

## 4. SEO Issues

### 4.1 Links Do Not Have Descriptive Text — 6 Links

**Affects:** Desktop + Mobile  
**Impact:** High — directly hurts SEO score  

Already covered in **2.5** above. Descriptive link text is both an accessibility requirement and an SEO signal. Google uses link anchor text to understand the content of the destination page.

**Summary of changes needed:**

| Current text | Suggested text |
|---|---|
| Learn More (Marketing Enablement) | Learn about Marketing Enablement |
| Learn More (Program Management) | Learn about Program Management |
| Learn More (Sales Enablement) | Learn about Sales Enablement |
| Learn More (AI Shift blog) | Read: Surviving the AI Shift 2026 |
| Learn More (MS Ignite recap) | Read: Microsoft Ignite 2025 Recap |
| Learn More (MS Ignite preview) | Read: Microsoft Ignite 2025 Preview |

---

### 4.2 robots.txt Is Not Valid — 1 Error

**Affects:** Desktop + Mobile  
**Impact:** High — can affect crawling and indexing  

**Problem:**  
The `robots.txt` file contains an unknown directive on line 99:
```
LLMs: https://www.naganamedia.com/llms.txt
```

This is not a valid robots.txt directive. Crawlers may fail to parse the entire file when encountering unknown directives.

**File:** `public/robots.txt`

**Fix:**

Remove the invalid line. The standard `robots.txt` format only supports `User-agent`, `Allow`, `Disallow`, `Crawl-delay`, and `Sitemap` directives:

```
User-agent: *
Allow: /

Sitemap: https://www.naganamedia.com/sitemap.xml
```

If you want to reference `llms.txt` for AI crawlers, note that this is an emerging community standard and not part of the official robots.txt spec. Keep it separate or use a comment:

```
# LLMs.txt: https://www.naganamedia.com/llms.txt
User-agent: *
Allow: /
Sitemap: https://www.naganamedia.com/sitemap.xml
```

---

## 5. Extra Recommendations to Reach 100

These are improvements not flagged directly by PageSpeed but will help achieve and maintain perfect scores, improve real-user experience, and support long-term SEO health.

### 5.1 Add `<link rel="preload">` for Hero Font

If you are using a custom font loaded via `src/fonts/index.ts`, ensure it is preloaded to prevent Flash of Unstyled Text (FOUT) and layout shifts:

```tsx
// In layout.tsx
<link
  rel="preload"
  href="/fonts/your-font.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

Next.js handles Google Fonts automatically, but local fonts need explicit preloading.

---

### 5.2 Add Structured Data (JSON-LD) for Organisation and Blog Posts

Structured data helps Google understand your content and can unlock rich results in search. The site currently has no JSON-LD schema.

Add to `src/app/(default)/layout.tsx`:
```tsx
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nagana Media',
  url: 'https://www.naganamedia.com',
  logo: 'https://www.naganamedia.com/assets/static/logo.webp',
  sameAs: [
    'https://www.linkedin.com/company/nagana-media-tech/',
  ],
};

// In <head>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

Add `BlogPosting` schema to each blog post page in `src/app/(default)/blogs/[slug]/page.tsx`:
```tsx
const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  author: { '@type': 'Person', name: post.author },
  image: post.coverImage,
};
```

---

### 5.3 Implement `next/image` `placeholder="blur"` for All Images

This prevents the visual "pop-in" of images as they load and reduces perceived CLS:

```tsx
import { StaticImageData } from 'next/image';
import heroImageSrc from '@/public/assets/static/heroImage.webp';

<Image
  src={heroImageSrc}     // import directly for blur placeholder to work
  alt="heroImage"
  placeholder="blur"
  priority
  className="w-full object-cover"
/>
```

When importing images as modules (not via URL strings), Next.js automatically generates a blurred placeholder at build time.

---

### 5.4 Add `width` and `height` to ALL Images to Prevent CLS

Every `<Image>` component on the site should have explicit `width` and `height` props even if using `fill` layout. This allows the browser to reserve space before the image loads. Review all images in:
- `src/components/feature/Hero/Hero.tsx`
- `src/components/feature/WhatWeDo/WhatWeDo.tsx`
- `src/components/feature/WhyChooseUs/WhyChooseUs.tsx`
- `src/components/common/BlogCard/BlogCard.tsx`
- `src/components/common/TeamCard/TeamCard.tsx`

---

### 5.5 Add `rel="noopener noreferrer"` to All External Links

All `target="_blank"` links should have `rel="noopener noreferrer"` to prevent tab hijacking and avoid leaking referrer information:

```tsx
// Find all instances of target="_blank" in the codebase
// Add rel="noopener noreferrer" to each

<a
  href="https://external-site.com"
  target="_blank"
  rel="noopener noreferrer"
>
  External Link
</a>
```

Run a project-wide search: `grep -r 'target="_blank"' src/` and audit each result.

---

### 5.6 Add a `skip-to-content` Link for Keyboard Accessibility

Users who navigate by keyboard should be able to skip the navigation and jump directly to main content. This is a WCAG 2.1 AA requirement:

```tsx
// At the very top of layout.tsx body
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
>
  Skip to main content
</a>

// On the main content element
<main id="main-content">
  {children}
</main>
```

---

### 5.7 Compress and Convert `info_01.png` to WebP

In `public/assets/blog/surviving-the-ai-shift-2026/`, the file `info_01.png` is still in PNG format while all other assets are WebP. PNG files are significantly larger. Convert it:

```bash
cwebp -q 80 public/assets/blog/surviving-the-ai-shift-2026/info_01.png \
  -o public/assets/blog/surviving-the-ai-shift-2026/info_01_converted.webp
```

Then update the reference in the blog markdown to use `info_01.webp` (which already exists in that folder).

---

### 5.8 Add `lang` Attribute Verification to `<html>`

Ensure the `<html lang="en">` attribute is correctly set in your root layout. This is required for screen readers to use the correct language profile:

```tsx
// src/app/(default)/layout.tsx
<html lang="en">
```

---

### 5.9 Consider Server-Side PostHog (No Client-Side Scripts Needed)

For maximum performance, consider moving PostHog analytics to the server side using the `posthog-node` library. This eliminates all client-side PostHog JS overhead and avoids the 132 KiB + TTI penalty entirely. The existing `posthog-js@1.255.1` client package can remain for session recording if needed, but page views and events can be tracked server-side:

```bash
npm install posthog-node
```

```ts
// src/utils/api.ts
import { PostHog } from 'posthog-node';

export const posthogServer = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  flushAt: 1,
  flushInterval: 0,
});
```

Use it inside Server Components and route handlers (tRPC routes at `src/server/api/routers/` or the API route at `src/app/api/trpc/`):

```ts
// In a Next.js Server Component or tRPC router
import { posthogServer } from '@/utils/api';

posthogServer.capture({
  distinctId: userId,
  event: 'page_view',
  properties: { path: '/services' },
});
```

This is the most aggressive PostHog optimization and would likely push the mobile performance score to 95+.

---

### 5.10 Enable Vercel Edge Caching / CDN Headers for Static Assets

If deployed on Vercel, ensure static assets in `public/` have long-lived cache headers. Add to `next.config.js` — using ESM `export default`:

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // public/assets/ — team images, blog covers, static images
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Next.js hashed static chunks
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## Summary — Priority Fix Order

| # | Issue | Devices | Effort | Score impact |
|---|---|---|---|---|
| 1 | LCP image `loading="lazy"` → `priority` | Both | 5 min | Performance +10 (mobile) |
| 2 | Fix desktop nav `<ul>` → proper `<li>` structure | Desktop | 30 min | Accessibility +13 (desktop) |
| 3 | Defer PostHog + add preconnect hints | Both | 1 hr | Performance +3–5 |
| 4 | Replace `text-black/50` with accessible colour | Both | 1 hr | Accessibility +5 |
| 5 | Fix robots.txt + deploy llms.txt | Both | 10 min | SEO +5, Best Practices +2 |
| 6 | Add descriptive CTA link text | Both | 30 min | SEO +5, Accessibility +3 |
| 7 | Add CSP + COOP security headers | Both | 1 hr | Best Practices +4 |
| 8 | Add `aria-label` to icon buttons + LinkedIn link | Both | 20 min | Accessibility +3 |
| 9 | Fix oversized images with `sizes` prop | Desktop | 30 min | Performance +1 |
| 10 | Legacy JS — update browserslist target | Both | 15 min | Performance +1 |
| 11 | Unused JS — dynamic imports | Both | 2–3 hrs | Performance +1–2 |
| 12 | Self-host / proxy PostHog scripts | Both | 2 hrs | Performance +2, Best Practices +1 |
| 13 | Add JSON-LD structured data | Both | 1 hr | SEO bonus (rich results) |
| 14 | Add `placeholder="blur"` to images | Both | 30 min | CLS improvement |
| 15 | Add skip-to-content link | Both | 15 min | Accessibility +1 |

---

*Report generated from PageSpeed Insights analysis — Mar 17, 2026*  
*Codebase: naganamedia_website (Next.js 16.0.10, React 19.2.3, Tailwind CSS 3.4.3, Radix UI, posthog-js 1.255.1, TypeScript 5.5.3, Node package manager: npm 10.8.3)*