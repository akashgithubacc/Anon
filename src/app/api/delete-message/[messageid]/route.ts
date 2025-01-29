import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export const dynamic = "force-dynamic";

// ✅ Correct way to extract params in Next.js API Route
export async function DELETE(
	request: NextRequest,
	context: { params: { messageid: string } }
) {
	const { messageid } = context.params; // ✅ Use context to get params
	await dbConnect();

	const session = await getServerSession(authOptions);
	const _user: User = session?.user;

	if (!session || !_user) {
		return NextResponse.json(
			{ success: false, message: "Not authenticated" },
			{ status: 401 }
		);
	}

	try {
		const updateResult = await UserModel.updateOne(
			{ _id: _user._id },
			{ $pull: { messages: { _id: messageid } } }
		);

		if (updateResult.modifiedCount === 0) {
			return NextResponse.json(
				{
					message: "Message not found or already deleted",
					success: false,
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Message deleted", success: true },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting message:", error);
		return NextResponse.json(
			{ message: "Error deleting message", success: false },
			{ status: 500 }
		);
	}
}
