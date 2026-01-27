/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetPassword(email, newPassword) {
    if (!email || !newPassword) {
        console.error("Usage: node scripts/reset_password.js <email> <new_password>");
        process.exit(1);
    }

    try {
        console.log(`Searching for user: ${email}`);
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            console.error("User not found!");
            process.exit(1);
        }

        console.log(`User found: ${user.name} (${user.id})`);
        console.log("Hashing password...");

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        console.log("✅ Password updated successfully!");
        console.log(`Try logging in with: ${newPassword}`);

    } catch (error) {
        console.error("Error resetting password:", error);
    } finally {
        await prisma.$disconnect();
    }
}

const args = process.argv.slice(2);
resetPassword(args[0], args[1]);
