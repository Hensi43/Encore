"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SignatureNights() {
    const nights = [
        {
            title: "MUSHAIRA",
            subtitle: "A Night of Poetry",
            image: "/images/event/poetry.png", // Using the generated image
            delay: 0
        },
        {
            title: "BOLLYWOOD NIGHT",
            subtitle: "Star Performance",
            image: "/images/event/10.jpg", // Placeholder - check existing images
            delay: 0.2
        },
        {
            title: "EDM NIGHT",
            subtitle: "Electrifying Beats",
            image: "/images/event/28.jpg",
            delay: 0.4
        }
    ];

    return (
        <section className="bg-black py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-cinzel text-gold mb-4">SIGNATURE NIGHTS</h2>
                    <p className="text-gray-400 font-marcellus tracking-widest">EXPERIENCE THE MAGIC</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {nights.map((night, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: night.delay, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative h-[400px] w-full overflow-hidden rounded-lg border border-white/10"
                        >
                            <Image
                                src={night.image}
                                alt={night.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300" />

                            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-cinzel text-white mb-2">{night.title}</h3>
                                <p className="text-gold font-marcellus text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {night.subtitle}
                                </p>
                            </div>

                            {/* Border Effect */}
                            <div className="absolute inset-4 border border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-95 group-hover:scale-100" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
