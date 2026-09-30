import Calculator from "@/components/calculator/Calculator";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 sm:py-6">
        <Calculator />
      </main>
    </div>
  );
}
