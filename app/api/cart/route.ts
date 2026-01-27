
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { eventsData } from "@/lib/data";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            cart: {
                include: { items: true },
            },
        },
    });

    return NextResponse.json(user?.cart || { items: [] });
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventSlug } = await req.json();
    const event = eventsData.find((e) => e.slug === eventSlug);

    if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    let cart = await prisma.cart.findUnique({ where: { userId: user.id } });

    if (!cart) {
        cart = await prisma.cart.create({ data: { userId: user.id } });
    }

    // Check if item already exists
    const existingItem = await prisma.cartItem.findUnique({
        where: {
            cartId_eventSlug: {
                cartId: cart.id,
                eventSlug: eventSlug,
            },
        },
    });

    if (existingItem) {
        return NextResponse.json({ message: "Item already in cart" }, { status: 409 });
    }

    // Add to cart
    const newItem = await prisma.cartItem.create({
        data: {
            cartId: cart.id,
            eventSlug: event.slug,
            eventName: event.title,
            price: event.price || 0,
        },
    });

    return NextResponse.json(newItem);
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cartItemId = searchParams.get("id");

    if (!cartItemId) {
        return NextResponse.json({ error: "Cart Item ID required" }, { status: 400 });
    }

    // Verify ownership before deleting
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { cart: true }
    });

    if (!user?.cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

    await prisma.cartItem.deleteMany({
        where: {
            id: cartItemId,
            cartId: user.cart.id // Ensure item belongs to user's cart
        }
    });

    return NextResponse.json({ success: true });
}
