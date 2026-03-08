"use client";

import { useEffect, useState } from "react";

export const useMediaQuery = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isDesktopView = window.innerWidth >= 768;
      setIsDesktop(isDesktopView);
      setIsMobile(!isDesktopView);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isDesktop, isMobile };
};
