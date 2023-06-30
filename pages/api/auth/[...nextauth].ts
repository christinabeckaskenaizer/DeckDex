import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: user.email
        }
      })

      if (dbUser) {
        session.user = dbUser
      }
      return session
    }
  }

};

export default NextAuth({
  ...authOptions,
});

