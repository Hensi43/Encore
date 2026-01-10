"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { eventsData } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-cinzel text-gold mb-12 text-center"
                >
                    Events & Competitions
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventsData.map((event, index) => (
                        <Link href={`/events/${event.slug || '#'}`} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                className="group relative bg-gray-900 rounded-xl overflow-hidden border border-white/10 hover:border-gold/60 transition-all duration-300 h-full flex flex-col"
                            >
                                {/* Image Container - Portrait Aspect Ratio */}
                                <div className="relative aspect-[4/5] w-full overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-gold/90 text-black text-xs font-bold uppercase tracking-wider rounded-sm">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-cinzel text-white mb-2 drop-shadow-md group-hover:text-gold transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {event.description}
                                    </p>
                                    <div className="h-0.5 w-12 bg-gold group-hover:w-full transition-all duration-500 ease-out" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
