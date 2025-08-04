import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-vtbn0.gstatic.com",
        port: "",
        pathname: "/video/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn1.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn2.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "t1.gstatic.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "t2.gstatic.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "t3.gstatic.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
