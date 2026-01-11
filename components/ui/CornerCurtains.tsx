"use client";

import { usePathname } from 'next/navigation';

export default function CornerCurtains() {
    const pathname = usePathname();

    // Do not show on Admin Panel
    if (pathname?.startsWith('/admin')) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
            {/* Left Corner Curtain */}
            <div className="absolute top-0 left-0 w-32 h-48 md:w-48 md:h-64">
                <div
                    className="w-full h-full rounded-br-[100%]"
                    style={{
                        background: "radial-gradient(circle at 100% 100%, transparent 40%, #7f1d1d 45%, #450a0a 100%)",
                        boxShadow: "inset -10px -10px 20px rgba(0,0,0,0.5), 5px 5px 15px rgba(0,0,0,0.5)"
                    }}
                />
                {/* Tassel / Rope Hint */}
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-gold shadow-[0_0_10px_#FFD700] translate-x-1/2 translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-1 h-12 bg-gold/80 blur-[1px] translate-x-1/2 translate-y-full" />
            </div>

            {/* Right Corner Curtain */}
            <div className="absolute top-0 right-0 w-32 h-48 md:w-48 md:h-64">
                <div
                    className="w-full h-full rounded-bl-[100%]"
                    style={{
                        background: "radial-gradient(circle at 0% 100%, transparent 40%, #7f1d1d 45%, #450a0a 100%)",
                        boxShadow: "inset 10px -10px 20px rgba(0,0,0,0.5), -5px 5px 15px rgba(0,0,0,0.5)"
                    }}
                />
                {/* Tassel / Rope Hint */}
                <div className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-gold shadow-[0_0_10px_#FFD700] -translate-x-1/2 translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-1 h-12 bg-gold/80 blur-[1px] -translate-x-1/2 translate-y-full" />
            </div>
        </div>
    );
}
