import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: { "/*": ["./content/samples/**/*.txt"] },
};

export default nextConfig;
