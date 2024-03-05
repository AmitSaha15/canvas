/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                host: "liveblocks.io",
                port: ""
            }
        ]
    }
};

export default nextConfig;
