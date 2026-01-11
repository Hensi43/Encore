import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, ...updates } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Get current user to check if already completed
        const currentUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!currentUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        let coinIncrement = 0;

        // If completing profile for the first time
        if (updates.profileCompleted && !currentUser.profileCompleted) {
            coinIncrement = 50;
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                ...updates,
                caCoins: { increment: coinIncrement }
            }
        });

        return NextResponse.json({
            success: true,
            user: updatedUser,
            message: coinIncrement > 0 ? "Profile Updated! +50 Coins" : "Profile Updated"
        }, { status: 200 });

    } catch (error) {
        console.error("Update Error", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
