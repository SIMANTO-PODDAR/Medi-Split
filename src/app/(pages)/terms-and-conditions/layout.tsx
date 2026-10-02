import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | MediSplit",
  description: "Read the Terms & Conditions for using Medi-Split, a smart medicine price and discount calculator.",
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
