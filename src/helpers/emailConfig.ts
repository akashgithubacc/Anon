// /helpers/emailConfig.ts

export const emailConfig = {
	service: "gmail", // Use your email service provider
	auth: {
		user: process.env.EMAIL_USER, // Your email address
		pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
	},
};
