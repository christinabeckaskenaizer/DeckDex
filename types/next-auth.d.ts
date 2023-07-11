import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
        id: string;
        userName: string | null;
        bio: string | null;
    } & DefaultSession["user"]
  }

  interface deck {
    deck: {
        id: string;
        userId: string;
        name: string;
    }
  }
}