"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import CartDrawer from '@/components/cart/CartDrawer';
import TopBar from '@/components/layout/TopBar';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { scrollY } = useScroll();

    const [cartCount, setCartCount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const updateCartCount = async () => {
        try {
            const res = await fetch('/api/cart');
            if (res.ok) {
                const data = await res.json();
                setCartCount(data.items?.length || 0);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const checkLogin = () => {
            if (typeof window !== 'undefined') {
                const user = localStorage.getItem('encore_user');
                setIsLoggedIn(!!user);
                if (user) updateCartCount();
            }
        };

        checkLogin();
        window.addEventListener('storage', checkLogin);
        window.addEventListener('user-login', checkLogin);
        window.addEventListener('cart-updated', updateCartCount);

        return () => {
            window.removeEventListener('storage', checkLogin);
            window.removeEventListener('user-login', checkLogin);
            window.removeEventListener('cart-updated', updateCartCount);
        };
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) return null;

    const leftLinks = [
        { name: 'Home', href: '/' },
        { name: 'Events', href: '/events' },
    ];

    const rightLinks = [
        { name: 'Sponsors', href: '/sponsorship' },
        { name: 'About', href: '/about' },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "circOut" }}
            >
                {/* Top Utility Bar (Hides on Scroll) */}
                <AnimatePresence>
                    {!isScrolled && <TopBar />}
                </AnimatePresence>

                {/* Main Navbar */}
                <div
                    className={`w-full transition-all duration-500 ${isScrolled
                            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-2'
                            : 'bg-gradient-to-b from-black/80 to-transparent py-4'
                        }`}
                >
                    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex justify-between items-center">

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden flex items-center z-50">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gold">
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* DESKTOP NAVIGATION - LEFT */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {leftLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative group px-2 py-1"
                                >
                                    <span className="font-marcellus text-sm tracking-[0.2em] text-gray-300 group-hover:text-gold transition-colors uppercase">
                                        {link.name}
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300 ease-out" />
                                </Link>
                            ))}
                        </nav>

                        {/* CENTER LOGO */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <Link href="/" className="relative group">
                                <div className={`relative transition-all duration-500 ${isScrolled ? 'w-12 h-12' : 'w-16 h-16 md:w-20 md:h-20'}`}>
                                    <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />
                                    <Image
                                        src="/images/iet_logo_new.png"
                                        alt="Encore Logo"
                                        fill
                                        className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* DESKTOP NAVIGATION - RIGHT */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {rightLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative group px-2 py-1"
                                >
                                    <span className="font-marcellus text-sm tracking-[0.2em] text-gray-300 group-hover:text-gold transition-colors uppercase">
                                        {link.name}
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300 ease-out" />
                                </Link>
                            ))}

                            <div className="h-4 w-[1px] bg-white/10 mx-2" />

                            {/* Icons Row */}
                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <Link href="/ca-portal">
                                        <span className="font-marcellus text-[10px] text-gold border border-gold/30 px-2 py-1 rounded hover:bg-gold hover:text-black transition-all cursor-pointer">
                                            CA PORTAL
                                        </span>
                                    </Link>
                                </div>

                                <button onClick={() => setIsCartOpen(true)} className="text-white/80 hover:text-gold transition-colors relative">
                                    <ShoppingCart size={18} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-black font-bold">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>

                                <Link href={isLoggedIn ? "/dashboard" : "/login"}>
                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer group shadow-[0_0_10px_rgba(255,215,0,0.1)]">
                                        <User size={14} className="group-hover:scale-110 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        </nav>

                        {/* Mobile Cart & Profile (Visible on Mobile) */}
                        <div className="md:hidden flex items-center gap-4">
                            <button onClick={() => setIsCartOpen(true)} className="text-gold relative">
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <Link href={isLoggedIn ? "/dashboard" : "/login"}>
                                <div className="w-7 h-7 rounded-full border border-gold/50 flex items-center justify-center text-gold">
                                    <User size={14} />
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </motion.header>

            {/* Full Screen Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center"
                    >
                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/10 rounded-full blur-[100px]" />

                        <nav className="flex flex-col items-center space-y-8 relative z-10">
                            {[...leftLinks, ...rightLinks].map((link, idx) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="text-3xl font-cinzel text-white/80 hover:text-gold transition-colors tracking-widest uppercase"
                                    >
                                        {link.name}
                                    </motion.span>
                                </Link>
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-8"
                            >
                                <Link
                                    href="/ca-portal"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-6 py-2 border border-gold/40 text-gold font-marcellus rounded hover:bg-gold hover:text-black transition-all"
                                >
                                    CAMPUS AMBASSADOR
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

