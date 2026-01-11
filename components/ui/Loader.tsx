"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (typeof window !== 'undefined') {
                (window as any).hasShownIntro = true;
            }
        }, 1200); // Faster duration
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
                >
                    {/* Left Curtain */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "-100%", transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] } }}
                        className="absolute left-0 top-0 h-full w-1/2 z-20 flex items-center justify-end"
                        style={{
                            background: "linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 20%, #050505 40%, #151515 60%, #020202 80%, #0a0a0a 100%)",
                            boxShadow: "10px 0 60px rgba(0,0,0,0.9), inset -10px 0 20px rgba(0,0,0,0.8)"
                        }}
                    >
                        {/* Texture Overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none mix-blend-overlay"></div>

                        {/* Gold Border/Tassel hint at edge */}
                        <div className="absolute right-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#8B6508] via-[#FFD700] to-[#8B6508] shadow-[0_0_15px_#FFD700_80]" />
                    </motion.div>

                    {/* Right Curtain */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "100%", transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] } }}
                        className="absolute right-0 top-0 h-full w-1/2 z-20 flex items-center justify-start"
                        style={{
                            background: "linear-gradient(90deg, #0a0a0a 0%, #020202 20%, #151515 40%, #050505 60%, #1a1a1a 80%, #0a0a0a 100%)",
                            boxShadow: "-10px 0 60px rgba(0,0,0,0.9), inset 10px 0 20px rgba(0,0,0,0.8)"
                        }}
                    >
                        {/* Texture Overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none mix-blend-overlay"></div>

                        {/* Gold Border/Tassel hint at edge */}
                        <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#8B6508] via-[#FFD700] to-[#8B6508] shadow-[0_0_15px_#FFD700_80]" />
                    </motion.div>

                    {/* Center Content */}
                    {/* Center Content Removed as per request */}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
