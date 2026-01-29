"use client";

import { motion } from 'framer-motion';

export default function TimelineTeaser() {
    const events = [
        { day: "Day 1", title: "Inauguration & Prelims", date: "Feb 20" },
        { day: "Day 2", title: "Cultural Showcases", date: "Feb 21" },
        { day: "Day 3", title: "Grand Finale", date: "Feb 22" },
    ];

    return (
        <section className="bg-black py-20 relative border-t border-b border-white/5">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-4xl font-cinzel text-gold mb-16"
                >
                    ROYAL CHRONICLE
                </motion.h2>

                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold/50 to-transparent hidden md:block" />

                    {events.map((event, index) => (
                        <div key={index} className="flex flex-col md:flex-row justify-between items-center mb-12 relative group">
                            {/* Dot */}
                            <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-gold rounded-full z-10 hidden md:block group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />

                            {/* Left Side */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`w-full md:w-[45%] text-center md:text-right ${index % 2 !== 0 ? 'md:order-last md:text-left' : ''}`}
                            >
                                <h3 className="text-2xl font-cinzel text-white">{event.day}</h3>
                                <p className="text-gold/60 font-marcellus">{event.date}</p>
                            </motion.div>

                            {/* Right Side */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`w-full md:w-[45%] text-center md:text-left mt-2 md:mt-0 ${index % 2 !== 0 ? 'md:order-first md:text-right' : ''}`}
                            >
                                <p className="text-lg text-gray-300 font-marcellus tracking-wider group-hover:text-white transition-colors">
                                    {event.title}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
