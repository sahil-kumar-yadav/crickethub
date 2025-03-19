// src/pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/utils/api";

export const authOptions = {
  providers: [
    // Credentials provider for username/email and password login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Send credentials to the backend for validation
          const res = await api.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data;

          if (user && user.token) {
            // Return the user object if login is successful
            return {
              id: user._id,
              email: user.email,
              name: user.name,
              token: user.token, // Store the token in the session for future requests
            };
          } else {
            return null; // Return null if login failed
          }
        } catch (error) {
          console.error("Login error:", error);
          return null; // Return null in case of an error
        }
      }
    }),
    // Optional: You can add other providers (e.g., Google, Facebook) if needed.
  ],
  
  // Custom pages for NextAuth.js
  pages: {
    signIn: '/login', // Redirect to a custom login page
  },
  
  // Secret for encrypting JWT token (ensure to set this in .env)
  secret: process.env.AUTH_SECRET,

  // Configure session strategy (you can use JWT)
  session: {
    strategy: "jwt", // Use JSON Web Tokens to store session data
  },

  callbacks: {
    // The JWT callback is called whenever a session is created
    async jwt({ token, user }) {
      if (user) {
        // If user is authenticated, store the user's token and other details
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.token = user.token; // Store token in the JWT token object
      }
      return token;
    },
    // The session callback will provide the session data
    async session({ session, token }) {
      session.id = token.id;
      session.email = token.email;
      session.name = token.name;
      session.token = token.token; // Attach the token to session
      return session;
    }
  },
};

export default NextAuth(authOptions);
