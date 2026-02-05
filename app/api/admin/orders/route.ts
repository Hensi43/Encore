
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { secret, orderId, status } = body;
        const envSecret = process.env.ADMIN_SECRET || 'hensi43';

        if (secret !== envSecret) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!orderId || !status) {
            return NextResponse.json({ error: 'Order ID and Status required' }, { status: 400 });
        }

        const validStatuses = ['PENDING', 'PAID', 'FAILED'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid Status' }, { status: 400 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        // If order contains a 'passType', we might want to also verify the user globally or similar, 
        // but for now let's just update the order. 
        // Actually, if the order is PAID and it has a passType or it has items, 
        // we might want to ensure the user's `totalPaid` reflects it?
        // The User model has `totalPaid` Int field.

        if (status === 'PAID') {
            // Optional: Update user totalPaid if needed, or rely on aggregation. 
            // Currently the Admin panel verifies the user manually. 
            // We can automate marking user as verified if they have a PAID order?
            // Let's keep it simple: Just update the order status.
        }

        return NextResponse.json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error("Order Update Error:", error);
        return NextResponse.json({ error: 'Update Failed' }, { status: 500 });
    }
}
