// components/TableEnhancer.tsx
"use client";

import { useEffect } from "react";

const TableEnhancer = () => {
  useEffect(() => {
    // Add data-label attributes for mobile responsiveness
    const tables = document.querySelectorAll(".markdown table");

    tables.forEach((table) => {
      const headers = Array.from(table.querySelectorAll("th")).map(
        (th) => th.textContent?.trim() ?? "",
      );
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        cells.forEach((cell, index) => {
          if (headers[index]) {
            cell.setAttribute("data-label", headers[index]);
          }
        });
      });
    });

    // Add scroll indicators for wide tables
    const addScrollIndicators = () => {
      tables.forEach((table) => {
        const wrapper = document.createElement("div");
        wrapper.className = "table-wrapper relative overflow-x-auto";
        wrapper.innerHTML =
          '<div class="scroll-indicator scroll-indicator-left absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none opacity-0 transition-opacity duration-200 z-10"></div>';
        wrapper.innerHTML +=
          '<div class="scroll-indicator scroll-indicator-right absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-100 transition-opacity duration-200 z-10"></div>';

        if (table.parentNode) {
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);

          // Add scroll event listener
          //   wrapper.addEventListener("scroll", () => {
          //     const { scrollLeft, scrollWidth, clientWidth } = wrapper;
          //     const leftIndicator = wrapper.querySelector(
          //       ".scroll-indicator-left",
          //     )! ;
          //     const rightIndicator = wrapper.querySelector(
          //       ".scroll-indicator-right",
          //     )!;

          //     if (leftIndicator) {
          //       leftIndicator.style.opacity = scrollLeft > 0 ? "1" : "0";
          //     }

          //     if (rightIndicator) {
          //       rightIndicator.style.opacity =
          //         scrollLeft < scrollWidth - clientWidth - 1 ? "1" : "0";
          //     }
          //   });
        }
      });
    };

    addScrollIndicators();
  }, []);

  return null;
};

export default TableEnhancer;
