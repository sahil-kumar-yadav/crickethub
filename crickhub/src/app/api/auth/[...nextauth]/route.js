import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/utils/mongodb';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { email: user.email };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
  pages: {
    signIn: '/', // Redirect to the home page
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ** Fix: Export HTTP handlers **
export const { GET, POST } = NextAuth(authOptions);
