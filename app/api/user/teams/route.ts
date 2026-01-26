import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                teams: {
                    include: { members: true }
                },
                ledTeams: {
                    include: { members: true }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Combine teams and ensure uniqueness (though user.teams should have all since leader is member too)
        // Actually, in the create logic I connected leader as member. So `teams` should contain all.
        // But let's return `teams` directly.

        return NextResponse.json({ teams: user.teams }, { status: 200 });

    } catch (error) {
        console.error("Fetch Teams Error", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
