import { auth } from "@/auth";
import { User } from "@prisma/client";

export default async function getUser() {
  const session = await auth();
  const user = session?.user
  return user;
  
}
