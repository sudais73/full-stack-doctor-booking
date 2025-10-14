import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear the admin token cookie
    const response = NextResponse.json({
      success: true,
      msg: "Logged out successfully",
    });

    response.cookies.set("atoken", "", {
      httpOnly: true,
      expires: new Date(0), // expires immediately
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Logout failed" },
      { status: 500 }
    );
  }
}
