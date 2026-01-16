import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, college, year, accommodation, paymentId, password, gender, referralCode } = body;

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
        if (referralCode) {
            const referrer = await prisma.user.findUnique({
                where: { referralCode: referralCode }
            });

            if (referrer) {
                // Increment referrer's coin count (e.g., +50 coins)
                await prisma.user.update({
                    where: { id: referrer.id },
                    data: { caCoins: { increment: 50 } }
                });
                referrerId = referralCode;
            }
        }

        // Hash Password if provided
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password.trim(), 10);
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                // @ts-ignore
                password: hashedPassword,
                // @ts-ignore
                gender,
                phone,
                college,
                year,
                accommodation,
                paymentId,
                // @ts-ignore
                paymentScreenshot: body.paymentScreenshot,
                // @ts-ignore
                totalPaid: body.totalPaid || (accommodation === 'yes' ? 999 : 399),
                paymentVerified: false, // Always false until Admin approves
                referredBy: referrerId
            },
        });

        return NextResponse.json({
            message: 'Registration successful',
            user: newUser,
            exists: false
        }, { status: 201 });

    } catch (error: any) {
        console.error('Registration Error Details:', error); // Changed log message
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
