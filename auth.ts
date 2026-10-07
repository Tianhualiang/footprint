import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    signOut: "/sign-out",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "用户名",
          type: "text",
          placeholder: "输入你的用户名",
        },
        password: {
          label: "密码",
          type: "password",
          placeholder: "输入你的密码",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (user && user.password === credentials.password) {
          return user;
        }
        return null;
      },
    }),
  ],
});
