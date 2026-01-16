
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get User and Cart
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            cart: {
                include: { items: true },
            },
        },
    });

    if (!user || !user.cart || user.cart.items.length === 0) {
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const cartItems = user.cart.items;
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

    // Create Order
    const order = await prisma.order.create({
        data: {
            userId: user.id,
            totalAmount: totalAmount,
            status: "PENDING",
            items: {
                create: cartItems.map((item) => ({
                    eventSlug: item.eventSlug,
                    eventName: item.eventName,
                    price: item.price,
                })),
            },
        },
    });

    // Clear Cart
    await prisma.cartItem.deleteMany({
        where: { cartId: user.cart.id },
    });

    return NextResponse.json({ success: true, orderId: order.id });
}
