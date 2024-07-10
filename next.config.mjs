/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
          issuer: {and: [/\.(js|ts|md)x?$/]},
          type: 'asset/resource',
        });
  
        return config;
    }
};

export default nextConfig;
