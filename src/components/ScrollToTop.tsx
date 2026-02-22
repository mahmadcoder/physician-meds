import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Manages scroll position across route navigations:
 * - PUSH/REPLACE: scrolls to top (new page visit)
 * - POP (back/forward): restores the saved scroll position
 *
 * Uses sessionStorage so positions survive React re-renders.
 * Uses a requestAnimationFrame loop to keep retrying until the page
 * is tall enough to reach the saved scroll position.
 */

const STORAGE_KEY = "pm_scroll_positions";

function getPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function savePosition(path: string, y: number) {
  const positions = getPositions();
  positions[path] = y;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const lastPathname = useRef(pathname);

  // Continuously track scroll position for current route
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          savePosition(pathname, window.scrollY);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Also save on visibility change (user switching tabs then back)
    const onVisChange = () => {
      if (document.visibilityState === "hidden") {
        savePosition(pathname, window.scrollY);
      }
    };
    document.addEventListener("visibilitychange", onVisChange);

    return () => {
      // Save final position when leaving this route
      savePosition(pathname, window.scrollY);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, [pathname]);

  // Handle scroll on navigation
  useEffect(() => {
    if (navigationType === "POP") {
      const positions = getPositions();
      const saved = positions[pathname] ?? 0;

      if (saved > 0) {
        // Use a rAF loop that keeps trying until the page is long enough
        // and we've actually scrolled to the right position.
        let frameCount = 0;
        const maxFrames = 120; // ~2 seconds at 60fps

        const tryRestore = () => {
          window.scrollTo({ top: saved, left: 0, behavior: "instant" });

          // Check if we actually reached the position (within 5px tolerance)
          // or if we've exhausted attempts
          if (
            Math.abs(window.scrollY - saved) > 5 &&
            frameCount < maxFrames
          ) {
            frameCount++;
            requestAnimationFrame(tryRestore);
          }
        };

        // Start the rAF loop
        tryRestore();
      }
    } else {
      // PUSH or REPLACE — scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    lastPathname.current = pathname;
  }, [pathname, navigationType]);

  return null;
}
