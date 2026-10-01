import Link from "next/link";
import { FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <FiSearch className="w-8 h-8 text-gray-500" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        Page Not Found
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 active:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors cursor-pointer gap-1"
        aria-label="Go to home page"
      >
        <FiHome /> Home
      </Link>
    </div>
  );
}
