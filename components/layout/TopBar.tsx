"use client";

import { motion } from 'framer-motion';
import { Instagram, Youtube, MapPin, Calendar } from 'lucide-react';

export default function TopBar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden md:flex justify-between items-center w-full px-6 py-2 bg-black/80 backdrop-blur-sm border-b border-white/5 text-[10px] md:text-xs font-marcellus text-gold/80 z-50 relative"
        >
            {/* Left: Location & Date */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 group cursor-default">
                    <MapPin className="w-3 h-3 text-gold group-hover:text-white transition-colors" />
                    <span className="tracking-widest group-hover:text-white transition-colors">IET LUCKNOW</span>
                </div>
                <div className="flex items-center space-x-2 group cursor-default">
                    <Calendar className="w-3 h-3 text-gold group-hover:text-white transition-colors" />
                    <span className="tracking-widest group-hover:text-white transition-colors">COMING SOON</span>
                </div>
            </div>

            {/* Right: Socials */}
            <div className="flex items-center space-x-6">
                <p className="hidden lg:block tracking-wider opacity-60">The Annual Cultural Fest</p>
                <div className="h-3 w-[1px] bg-white/10 hidden lg:block"></div>
                <div className="flex items-center space-x-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all duration-300">
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all duration-300">
                        <Youtube className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
