"use client";

import Image from "next/image";
import { FiPackage } from "react-icons/fi";

export default function EmptyState() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-12 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
        <FiPackage className="w-5 h-5 text-gray-400" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">
        No products added yet
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Add medicines above to start your calculation.
      </p>
      <div className="flex justify-center">
        <Image
          src="/MediSplit-logo-footer.jpg"
          alt="MediSplit Logo Footer"
          width={500}
          height={500}
          className="w-[70%] h-auto rounded-md opacity-60"
          priority
        />
      </div>
    </div>
  );
}
