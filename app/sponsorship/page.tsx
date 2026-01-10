"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const sponsors = Array.from({ length: 12 }, (_, i) => `/images/sponsor/${i + 1}.jpg`);

export default function SponsorshipPage() {
    return (
        <main className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-cinzel text-gold mb-4"
                >
                    Our Sponsors
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 font-marcellus mb-16 max-w-2xl mx-auto"
                >
                    We are proud to be supported by these amazing partners who help make Encore a reality.
                </motion.p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {sponsors.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="aspect-[3/2] flex items-center justify-center relative group"
                        >
                            <div className="relative w-3/4 h-3/4 grayscale group-hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={src}
                                    alt={`Sponsor ${index + 1}`}
                                    fill
                                    className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
