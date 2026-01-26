import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { eventsData } from '@/lib/data';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, teamCode } = body;

        if (!userId || !teamCode) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Find Team
        const team = await prisma.team.findUnique({
            where: { code: teamCode },
            include: { members: true }
        });

        if (!team) {
            return NextResponse.json({ error: 'Invalid Team Code' }, { status: 404 });
        }

        // Check Event Constraints
        const event = eventsData.find(e => e.slug === team.eventSlug);
        if (!event) {
            return NextResponse.json({ error: 'Event data not found' }, { status: 500 });
        }

        // @ts-ignore
        const maxMembers = event.maxSize || 5; // Default fallback

        if (team.members.length >= maxMembers) {
            return NextResponse.json({ error: 'Team is full!' }, { status: 400 });
        }

        // Check if user is already in a team for this event
        const existingTeam = await prisma.team.findFirst({
            where: {
                eventSlug: team.eventSlug,
                OR: [
                    { leaderId: userId },
                    { members: { some: { id: userId } } }
                ]
            }
        });

        if (existingTeam) {
            return NextResponse.json({ error: 'You are already in a team for this event' }, { status: 400 });
        }

        // Add User
        await prisma.team.update({
            where: { id: team.id },
            data: {
                members: { connect: { id: userId } }
            }
        });

        return NextResponse.json({ success: true, teamName: team.name }, { status: 200 });

    } catch (error) {
        console.error("Join Team Error", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
