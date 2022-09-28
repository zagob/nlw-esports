import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify" } },
    }),
  ],
  session: {
    jwt: true,
    strategy: "jwt",
    // maxAge: 30 * 24 * 60,
    // updateAge: 24 * 60 * 60,
  },
  callbacks: {
    redirect({ baseUrl }) {
      return baseUrl;
    },
  },
} as NextAuthOptions;

export default NextAuth(authOptions);
