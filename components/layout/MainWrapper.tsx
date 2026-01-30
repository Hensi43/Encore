"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <main className={`relative ${isHome ? "" : "pt-24"}`}>
            {children}
        </main>
    );
}
