import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Medicines | Medi-Split",
  description: "Manage your locally saved medicines and unit prices.",
};

export default function AllMedicinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}