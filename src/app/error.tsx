"use client";

import { FiAlertCircle, FiHome } from "react-icons/fi";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-4">
        <FiAlertCircle className="w-8 h-8 text-red-500" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        Something went wrong
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md">
        We couldn&apos;t complete your request right now. Please try again or
        return later.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors cursor-pointer gap-2"
          aria-label="Go to home page"
        >
          <FiHome className="w-4 h-4" /> Home
        </Link>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 active:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors cursor-pointer"
          aria-label="Try again"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
