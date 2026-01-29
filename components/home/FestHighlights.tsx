"use client";

import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Music } from 'lucide-react';

export default function FestHighlights() {
    const stats = [
        { icon: Calendar, label: "Events", value: "30+" },
        { icon: Users, label: "Footfall", value: "10K+" },
        { icon: Trophy, label: "Prize Pool", value: "₹2L+" },
        { icon: Music, label: "Artists", value: "5+" },
    ];

    return (
        <section className="bg-black py-10 relative border-b border-white/5 overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gold/5 to-black pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="mb-3 p-3 rounded-full bg-white/5 border border-gold/20 group-hover:border-gold/60 transition-colors">
                                <stat.icon className="w-6 h-6 text-gold" />
                            </div>
                            <h3 className="text-3xl font-cinzel text-white font-bold mb-1">{stat.value}</h3>
                            <p className="text-sm font-marcellus text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
