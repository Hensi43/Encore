const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function verifyLogin(email, password) {
    if (!email || !password) {
        console.error("Usage: node scripts/verify_login.js <email> <password>");
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

        console.log(`User found: ${user.name}`);
        console.log(`Stored Hash: ${user.password}`);
        console.log(`Input Password: '${password}'`);

        const isValid = await bcrypt.compare(password, user.password);
        console.log(`Comparison Result: ${isValid ? "✅ MATCH" : "❌ DO NOT MATCH"}`);

        // Debug: Generate a new hash and see if it looks different (salt differences expected, but structure checking)
        const newHash = await bcrypt.hash(password, 10);
        console.log(`Fresh Hash of input: ${newHash}`);

    } catch (error) {
        console.error("Error verifying:", error);
    } finally {
        await prisma.$disconnect();
    }
}

const args = process.argv.slice(2);
verifyLogin(args[0], args[1]);
