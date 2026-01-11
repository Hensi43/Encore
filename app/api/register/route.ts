import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, college, year, accommodation, paymentId } = body;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({
                message: 'User already exists',
                user: existingUser,
                exists: true
            }, { status: 200 });
        }

        // Handle Referral
        let referrerId = null;
        if (body.referralCode) {
            const referrer = await prisma.user.findUnique({
                where: { referralCode: body.referralCode }
            });

            if (referrer) {
                // Increment referrer's coin count (e.g., +50 coins)
                await prisma.user.update({
                    where: { id: referrer.id },
                    data: { caCoins: { increment: 50 } }
                });
                referrerId = body.referralCode; // Store the code, or could store ID
            }
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                college,
                year,
                accommodation,
                paymentId,
                paymentVerified: !!paymentId, // Verify if payment ID exists
                referredBy: referrerId
            },
        });

        return NextResponse.json({
            message: 'Registration successful',
            user: newUser,
            exists: false
        }, { status: 201 });

    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
