import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ profile }) {

      const allowedEmails = [
        "cto@driwe.in",
        "admin@driwe.in",
        "imroz@driwe.in",
        "affan@driwe.in",
      ];

      const email = profile?.email || "";

      return allowedEmails.includes(email);
    },
  },
});

export { handler as GET, handler as POST };