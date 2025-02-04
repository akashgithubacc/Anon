// /helpers/sendVerificationEmail.ts

import nodemailer from "nodemailer";
import { emailConfig } from "./emailConfig";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/render";

export async function sendVerificationEmail(
	email: string,
	username: string,
	verifyCode: string
): Promise<ApiResponse> {
	try {
		const transporter = nodemailer.createTransport(emailConfig);

		// Use @react-email/render instead of react-dom/server
		const emailHtml = render(
			VerificationEmail({ username, otp: verifyCode })
		);

		const mailOptions = {
			from: '"Anon" <no-reply@anon.dev>',
			to: email,
			subject: "Anon Verification Code",
			html: emailHtml,
		};

		await transporter.sendMail(mailOptions);

		return {
			success: true,
			message: "Verification email sent successfully.",
		};
	} catch (emailError) {
		console.error("Error sending verification email:", emailError);
		return {
			success: false,
			message: "Failed to send verification email.",
		};
	}
}
