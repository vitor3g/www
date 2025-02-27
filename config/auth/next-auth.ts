import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import CredentialsProvider from "./providers/credentials-provider";
import GoogleProvider from "./providers/google-provider";
import FacebookProvider from "./providers/facebook-provider";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider, GoogleProvider, FacebookProvider],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
    newUser: "/",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          name: session.user?.name ?? null,
          email: session.user?.email ?? null,
          image: session.user?.image ?? null,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
