
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // Use Singleton
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient(); // Removed local instantiation

import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Login Attempt:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    console.log("Login Failed: User not found");
                    throw new Error("User not found");
                }

                // @ts-ignore
                if (!user.password) {
                    console.log("Login Failed: User has no password set");
                    throw new Error("Password not set");
                }

                // @ts-ignore
                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    console.log("Login Failed: Invalid Password");
                    throw new Error("Invalid password");
                }

                console.log("Login Success:", user.email);
                return user;
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            // Add user ID to session from database
            if (session.user?.email) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: session.user.email },
                });
                if (dbUser) {
                    // @ts-ignore
                    session.user.id = dbUser.id;
                    // @ts-ignore
                    session.user.role = dbUser.role;
                }
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login', // Error code passed in query string as ?error=
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
