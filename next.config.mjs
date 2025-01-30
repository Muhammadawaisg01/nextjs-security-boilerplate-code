/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
      },
    experimental:{
        runtime: 'nodejs',
    }
};

export default nextConfig;


// import type { NextConfig } from "next";
// const nextConfig: NextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };
// export default nextConfig;

