import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { User } from "@prisma/client";

export default async function getUser() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (findUser) return { status: 200, data: findUser };
    else {
      return { status: 401, error: "User Not Authenticated" };
    }
  } catch (err) {
    console.log("ERR:", err);
    return { status: 500, error: "Internal Server Error" };
  }
}
