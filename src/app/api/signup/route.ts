import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (findUser) {
      return NextResponse.json({ msg: "User already exists" }, { status: 409 });
    }
    const pwHash = (await bcrypt.hash(password,10)) as string;
    const createUser = await prisma.user.create({
      data: { name, email, password: pwHash },
    });

    const sessionToken = randomBytes(32).toString("hex");
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    const createSession = await prisma.session.create({
      data: {
        sessionToken,
        userId: createUser.id,
        expires,
      },
    });
    const response = NextResponse.json(
      { redirect: "/dashboard" },
      { status: 200 }
    );
    response.cookies.set("authjs.session-token", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
