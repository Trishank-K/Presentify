import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'assets.aceternity.com',
        port:'',
        pathname:'/manu.png',
        search:''
      }
    ]
  }
};

export default nextConfig;
