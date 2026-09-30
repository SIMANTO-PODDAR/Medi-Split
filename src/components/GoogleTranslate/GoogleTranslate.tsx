"use client";

import { useEffect } from "react";
import Script from "next/script";

const GoogleTranslate = () => {
  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      if (!(window as any).google?.translate?.TranslateElement) return;
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,bn",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
};

export default GoogleTranslate;
