"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Invisible component that triggers a visitor log request to /api/track
 * whenever the pathname changes (ignoring admin paths).
 */
export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // 1. Do not track admin panel visits
    if (!pathname || pathname.startsWith("/admin")) {
      return;
    }

    // 2. Prevent duplicate tracks for the exact same path in a single render session
    if (lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;

    const trackVisit = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: pathname,
            referrer: typeof document !== "undefined" ? document.referrer : "",
          }),
        });
      } catch (err) {
        // Silent error, do not disrupt user experience
        console.error("Failed to log visit:", err);
      }
    };

    // Delay slightly to allow full mount
    const timer = setTimeout(trackVisit, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
