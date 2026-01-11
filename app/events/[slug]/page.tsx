import { eventsData } from '@/lib/data';
import EventDetailClient from './EventDetailClient';

export async function generateStaticParams() {
    return eventsData.map((event) => ({
        slug: event.slug,
    }));
}

export default function EventDetail() {
    return <EventDetailClient />;
}
