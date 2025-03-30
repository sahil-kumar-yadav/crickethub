import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import axios from "axios";
import clientPromise from "@/utils/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("https://fuzzy-space-engine-g9r76wxg4rx3v6gx-5000.app.github.dev/api/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          if (res.data) {
            return {
              id: res.data._id,
              email: res.data.email,
              role: res.data.role || "user", // Ensure role exists
            };
          }
          return null;
        } catch (error) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Ensure correct field
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? session.user.id;
        session.user.role = token.role ?? "user";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // ✅ For Next.js App Router
