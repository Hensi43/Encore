/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Connecting to database...");
        const count = await prisma.user.count();
        console.log(`Connection successful. User count: ${count}`);

        if (count > 0) {
            const user = await prisma.user.findFirst({
                select: { email: true }
            });
            console.log(`Sample User Email: ${user?.email}`);
        } else {
            console.log("No users found in the database.");
        }

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
