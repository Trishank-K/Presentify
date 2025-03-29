import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  console.log("Session in middleware:", session);

  if (!session) {
    return NextResponse.redirect(new URL("/SignUp", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/another-route","/dashboard","/create-page"],
};
