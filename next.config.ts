import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Short, memorable addresses for videos and printed material, where a link
  // cannot be clicked. crmsolutions.app/call is spoken and shown in every video.
  async redirects() {
    return [
      { source: "/call", destination: "/book-discovery-call", permanent: false },
      { source: "/book", destination: "/book-discovery-call", permanent: false },
    ];
  },
};

export default nextConfig;
