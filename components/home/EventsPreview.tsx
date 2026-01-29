"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EventsPreview() {
    const categories = [
        {
            name: "Dance",
            description: "Rhythm of Royalty",
            gradient: "from-purple-900 to-black",
            link: "/events?cat=dance"
        },
        {
            name: "Music",
            description: "Melodies of the Court",
            gradient: "from-red-900 to-black",
            link: "/events?cat=music"
        },
        {
            name: "Dramatics",
            description: "Tales of Tradition",
            gradient: "from-blue-900 to-black",
            link: "/events?cat=dramatics"
        },
        {
            name: "Literary",
            description: "Words of Wisdom",
            gradient: "from-green-900 to-black",
            link: "/events?cat=literary"
        }
    ];

    return (
        <section className="bg-black py-20 relative px-4">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,215,0,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-cinzel text-white mb-2">EXPLORE CATEGORIES</h2>
                        <div className="h-1 w-24 bg-gold rounded-full" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <Link href={cat.link} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative h-64 rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-gold/50 transition-colors`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />

                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <h3 className="text-2xl font-cinzel text-white mb-1 group-hover:text-gold transition-colors">{cat.name}</h3>
                                    <p className="text-gray-400 text-sm font-marcellus mb-4 opacity-80 group-hover:opacity-100 transition-opacity">{cat.description}</p>

                                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-black transition-all duration-300">
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
