import { cookies } from "next/headers";

export async function POST(request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ success: false }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return Response.json({ success: true });
}