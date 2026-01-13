
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user.email) return false;

            // Check if user exists
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (!existingUser) {
                // Create new user if not exists
                await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name || "Encore User",
                        // You might want to flag them as needing profile completion
                        profileCompleted: false,
                    },
                });
            }

            return true;
        },
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
});

export { handler as GET, handler as POST };
