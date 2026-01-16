
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
    const email = process.argv[2];
    const passwordToCheck = process.argv[3];

    if (!email || !passwordToCheck) {
        console.log("Usage: npx tsx scripts/debug-auth.ts <email> <password>");
        return;
    }

    console.log(`Checking auth for: ${email}`);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.log("❌ User not found in Database");
        return;
    }

    console.log(`✅ User found: ${user.name} (${user.id})`);
    console.log(`🔑 Stored Hash: ${user.password ? user.password.substring(0, 10) + "..." : "NULL"}`);

    if (!user.password) {
        console.log("❌ No password set for this user.");
        return;
    }

    const match = await bcrypt.compare(passwordToCheck, user.password);
    console.log(`🔐 Password Match Result: ${match ? "SUCCESS ✅" : "FAILED ❌"}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
