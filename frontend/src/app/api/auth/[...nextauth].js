// src/pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from '@/utils/api';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await api.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data;

          if (user && user.token) {
            return { id: user._id, email: user.email, name: user.name };
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.AUTH_SECRET,
});

export { handlers as GET, handlers as POST };
