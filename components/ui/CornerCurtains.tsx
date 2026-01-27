"use client";

import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function CornerCurtains() {
    const pathname = usePathname();

    // Only show on Home Page
    if (pathname !== '/') return null;

    return (
        <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-[10] overflow-hidden">
            {/* Left Corner Curtain (Flipped) */}
            <div className="absolute top-0 left-0 w-[25vw] h-[25vw] md:w-[18vw] md:h-[18vw] max-w-[350px] max-h-[350px]">
                <Image
                    src="/images/red-curtain.jpg"
                    alt="Corner Curtain"
                    fill
                    className="object-contain object-top"
                    style={{ transform: "scaleX(-1)" }}
                />
            </div>

            {/* Right Corner Curtain */}
            <div className="absolute top-0 right-0 w-[25vw] h-[25vw] md:w-[18vw] md:h-[18vw] max-w-[350px] max-h-[350px]">
                <Image
                    src="/images/red-curtain.jpg"
                    alt="Corner Curtain"
                    fill
                    className="object-contain object-top"
                />
            </div>
        </div>
    );
}
