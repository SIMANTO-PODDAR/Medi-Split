"use client";

import { useEffect, useRef } from "react";

export default function VisitorTracker() {
  const accumulatedSecondsRef = useRef(0);
  const lastVisibleTimeRef = useRef<number | null>(null);
  const isInitialSentRef = useRef(false);

  useEffect(() => {
    const flush = (isClosing = false) => {
      if (lastVisibleTimeRef.current !== null) {
        const now = Date.now();
        const elapsedMs = now - lastVisibleTimeRef.current;
        if (elapsedMs > 0) {
          accumulatedSecondsRef.current += Math.floor(elapsedMs / 1000);
          lastVisibleTimeRef.current = now - (elapsedMs % 1000);
        }
      }

      const secondsToSend = accumulatedSecondsRef.current;

      if (!isInitialSentRef.current) {
        isInitialSentRef.current = true;
      } else if (secondsToSend <= 0) {
        return;
      }

      accumulatedSecondsRef.current = 0;

      const payload = JSON.stringify({ timeSpent: secondsToSend });

      if (
        isClosing &&
        typeof navigator !== "undefined" &&
        navigator.sendBeacon
      ) {
        const blob = new Blob([payload], { type: "application/json" });
        const sent = navigator.sendBeacon("/api/track", blob);
        if (sent) return;
      }

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Silently ignore network failures to prevent disruption
      });
    };

    if (
      typeof document !== "undefined" &&
      document.visibilityState === "visible"
    ) {
      lastVisibleTimeRef.current = Date.now();
    }

    // Send initial registration ping
    flush();

    // Periodic heartbeat flush every 20 seconds while visible
    const intervalId = setInterval(() => {
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "visible"
      ) {
        flush();
      }
    }, 20000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flush(true);
        lastVisibleTimeRef.current = null;
      } else if (document.visibilityState === "visible") {
        lastVisibleTimeRef.current = Date.now();
      }
    };

    const handlePageHide = () => {
      flush(true);
      lastVisibleTimeRef.current = null;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      flush(true);
    };
  }, []);

  return null;
}
