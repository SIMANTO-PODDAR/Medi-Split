import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use | Medi-Split",
  description:
    "A simple guide to using Medi-Split — learn how to add medicines, apply discounts, manage saved medicines, and get your final payable amount.",
};

export default function HowToUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

