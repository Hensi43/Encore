import React from 'react';

export default function RoomiGate({ className = "", color = "#FFD700" }: { className?: string; color?: string }) {
    return (
        <svg
            viewBox="0 0 1000 600"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Main Structure Group */}
            <g stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                {/* --- Central Great Arch --- */}
                {/* Outer Arch */}
                <path d="M300 600 V350 C300 200 350 100 500 50 C650 100 700 200 700 350 V600" strokeWidth="4" />

                {/* Inner Arch (Decorative Scalloped) */}
                <path d="M340 600 V360 C340 250 380 180 500 140 C620 180 660 250 660 360 V600" strokeWidth="3" />

                {/* Arch Details (The "Teeth") */}
                <path d="M340 360 Q360 340 380 360 Q400 340 420 360 Q440 340 460 360 Q480 340 500 360 Q520 340 540 360 Q560 340 580 360 Q600 340 620 360 Q640 340 660 360" fill="none" />

                {/* Central Chamber Window */}
                <path d="M450 600 V450 A50 50 0 0 1 550 450 V600" strokeWidth="2" />

                {/* --- Side Wings (Left) --- */}
                {/* Lower Level */}
                <rect x="50" y="450" width="250" height="150" strokeWidth="3" />
                <path d="M90 600 V500 A35 35 0 0 1 160 500 V600" /> {/* Arch 1 */}
                <path d="M190 600 V500 A35 35 0 0 1 260 500 V600" /> {/* Arch 2 */}

                {/* Upper Level with Parapet */}
                <rect x="50" y="350" width="250" height="100" strokeWidth="3" />
                <path d="M70 450 V390 A20 20 0 0 1 110 390 V450" />
                <path d="M130 450 V390 A20 20 0 0 1 170 390 V450" />
                <path d="M190 450 V390 A20 20 0 0 1 230 390 V450" />
                <path d="M250 450 V390 A20 20 0 0 1 290 390 V450" />

                {/* --- Side Wings (Right) --- */}
                {/* Lower Level */}
                <rect x="700" y="450" width="250" height="150" strokeWidth="3" />
                <path d="M740 600 V500 A35 35 0 0 1 810 500 V600" /> {/* Arch 1 */}
                <path d="M840 600 V500 A35 35 0 0 1 910 500 V600" /> {/* Arch 2 */}

                {/* Upper Level with Parapet */}
                <rect x="700" y="350" width="250" height="100" strokeWidth="3" />
                <path d="M710 450 V390 A20 20 0 0 1 750 390 V450" />
                <path d="M770 450 V390 A20 20 0 0 1 810 390 V450" />
                <path d="M830 450 V390 A20 20 0 0 1 870 390 V450" />
                <path d="M890 450 V390 A20 20 0 0 1 930 390 V450" />

                {/* --- Towers/Minarets --- */}
                {/* Left Tower */}
                <rect x="10" y="350" width="40" height="250" strokeWidth="3" />
                <path d="M10 350 L5 340 H55 L50 350" /> {/* Cap base */}
                <path d="M15 340 V310 A15 15 0 0 1 45 310 V340" /> {/* Dome */}
                <line x1="30" y1="310" x2="30" y2="280" /> {/* Spire */}

                {/* Right Tower */}
                <rect x="950" y="350" width="40" height="250" strokeWidth="3" />
                <path d="M950 350 L945 340 H995 L990 350" />
                <path d="M955 340 V310 A15 15 0 0 1 985 310 V340" />
                <line x1="970" y1="310" x2="970" y2="280" />

                {/* Inner Towers (Flanking Main Arch) */}
                <rect x="300" y="250" width="30" height="100" />
                <path d="M300 250 L295 240 H335 L330 250" />
                <path d="M305 240 V220 A10 10 0 0 1 325 220 V240" />

                <rect x="670" y="250" width="30" height="100" />
                <path d="M670 250 L665 240 H705 L700 250" />
                <path d="M675 240 V220 A10 10 0 0 1 695 220 V240" />

                {/* --- Top Chhatri (Main Dome) --- */}
                <path d="M460 50 V40 H540 V50" />
                <path d="M465 40 V10 C465 -30 535 -30 535 10 V40" strokeWidth="3" /> {/* Dome Shape */}
                <line x1="500" y1="-20" x2="500" y2="-50" /> {/* Spire */}

                {/* Decorative Pattern on Outer Arch */}
                <path d="M310 350 Q310 210 360 110" strokeDasharray="5 5" />
                <path d="M690 350 Q690 210 640 110" strokeDasharray="5 5" />
            </g>

            {/* Fill styles for depth (optional, keeping it mostly line art for 'graphic' look) */}
            <path d="M300 600 V350 C300 200 350 100 500 50 C650 100 700 200 700 350 V600 H300Z" fill="url(#goldGradient)" opacity="0.1" />

            <defs>
                <linearGradient id="goldGradient" x1="500" y1="0" x2="500" y2="600" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFD700" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#FFD700" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
}
