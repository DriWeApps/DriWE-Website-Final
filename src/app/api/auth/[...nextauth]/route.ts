// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async signIn({ profile }) {

//       const email = profile?.email || "";

//       const allowedEmails =
//         process.env.ALLOWED_GOOGLE_EMAILS?.split(",") || [];

//       return allowedEmails.includes(email);
//     },
//   },
// });

// export { handler as GET, handler as POST };



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

      const email = profile?.email || "";

      console.log("Google email:", email);

      const allowedEmails =
        process.env.ALLOWED_GOOGLE_EMAILS
          ?.split(",")
          .map((e) => e.trim()) || [];

      console.log("Allowed emails:", allowedEmails);

      return allowedEmails.includes(email);
    },
  },
});

export { handler as GET, handler as POST };