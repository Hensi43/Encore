"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SponsorsPreview() {
    // Placeholder logos - replace with actual sponsor logos
    const sponsors = [
        "Sponsor 1", "Sponsor 2", "Sponsor 3", "Sponsor 4", "Sponsor 5", "Sponsor 6"
    ];

    return (
        <section className="bg-black py-20 relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl font-cinzel text-gray-400">OUR PARTNERS</h2>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                <motion.div
                    className="flex space-x-12 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                >
                    {[...sponsors, ...sponsors].map((sponsor, index) => (
                        <div key={index} className="inline-block relative w-40 h-20 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer">
                            {/* Placeholder for Sponsor Logo */}
                            <div className="w-full h-full flex items-center justify-center border border-white/10 rounded bg-white/5 text-xs text-gray-500 font-marcellus">
                                {sponsor}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
