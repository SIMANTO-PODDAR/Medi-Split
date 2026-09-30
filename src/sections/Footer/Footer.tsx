const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-2xl mx-auto px-4 py-3 text-center space-y-0.5">
        <p className="text-xs text-gray-400">
          MediSplit — Smart Medicine Price & Discount Calculator by Reflect
          Pharma
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
  );
};

export default Footer;
