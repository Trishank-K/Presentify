import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      let user = null;
      const pwHash = await bcrypt.hash(credentials.password as string,10);
      user = await prisma.user.findFirst({
        where: {
          email: credentials.email as string,
          password: credentials.email as string,
        },
      });
      return user;
    },
  }),
  Google({allowDangerousEmailAccountLinking:true}),
]

export const providerMap = providers.map((provider)=>{
  if(typeof provider === "function")  {
    const providerData = provider()
    return{id: providerData.id, name: providerData.name}
  } else  {
    return {id: provider.id, name: provider.name}
  }
}).filter((provider)=>provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (user.email) {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email,
            },
          });
          if(!existingUser) {
            await prisma.user.create({
              data:{
                email: user.email,
                name: user.name || "Unknown",
                image: user.image
              }
            })
          }
        }
        return true;
      }
      return false;
    },
    async session({session, user})  {
      session.userId = user.id;
      return session;
    },
  },
  pages:{
    "signIn": "/signin"
  },
  
});
