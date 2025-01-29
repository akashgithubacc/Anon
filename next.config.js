/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	typescript: {
		ignoreBuildErrors: true, // ⚠️ Remove after debugging
	},
};

module.exports = nextConfig;
