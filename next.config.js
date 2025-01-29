/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	experimental: {
		appDir: true,
	},
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};

module.exports = nextConfig;
