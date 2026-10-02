import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["10.141.48.65"], // for devlopment only
};

export default nextConfig;
