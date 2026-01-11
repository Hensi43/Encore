import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, task } = await request.json();

        if (!email || !task) {
            return NextResponse.json({ error: 'Missing Data' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
        }

        // Check if already claimed
        // @ts-ignore
        if (user[task]) {
            return NextResponse.json({ error: 'Reward already claimed!' }, { status: 400 });
        }

        // Award Coins
        const REWARD_AMOUNT = 50;

        await prisma.user.update({
            where: { email },
            data: {
                [task]: true,
                caCoins: { increment: REWARD_AMOUNT }
            }
        });

        return NextResponse.json({
            success: true,
            coins: user.caCoins + REWARD_AMOUNT,
            message: `You earned ${REWARD_AMOUNT} coins!`
        }, { status: 200 });

    } catch (error) {
        console.error("Claim Error", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
