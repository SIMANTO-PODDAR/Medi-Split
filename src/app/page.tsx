import Calculator from "@/components/calculator/Calculator";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:py-5">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            <span style={{ color: "#085698" }}>MEDI</span>{" "}
            <span style={{ color: "#339d55" }}>SPLIT</span>
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Smart Medicine Price & Discount Calculator
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            by Reflect Pharma
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 sm:py-6">
        <Calculator />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-3 text-center space-y-0.5">
          <p className="text-xs text-gray-400">
            MediSplit — Smart Medicine Price & Discount Calculator by Reflect Pharma
          </p>
          <p className="text-xs text-gray-400">
            Developed by{" "}
            <a
              href="https://simanto-poddar-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors"
            >
              Simanto Poddar
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
