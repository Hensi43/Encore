import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: { orders: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if user has ANY order with a passType (PENDING or PAID)
        const passOrder = user.orders.find(o => o.passType !== null && o.passType !== undefined);
        const hasPass = !!passOrder;
        const passStatus = passOrder ? passOrder.status : null;

        return NextResponse.json({
            user: {
                ...user,
                hasPass,
                passStatus
            }
        }, { status: 200 });

    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
