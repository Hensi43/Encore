"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { User, Mail, ArrowRight } from 'lucide-react';

export default function LoginForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', accommodation: '' });

    const handleNext = () => {
        if (step === 1 && formData.name) {
            setStep(2);
        } else if (step === 2 && formData.email) {
            setStep(3);
        } else if (step === 4) {
            // Simulate Login after Payment
            const user = {
                name: formData.name,
                email: formData.email,
                accommodation: formData.accommodation,
                id: `ENC-26-${Math.floor(Math.random() * 10000)}`,
                coins: 100, // Bonus for joining
                paymentVerified: true
            };
            localStorage.setItem('encore_user', JSON.stringify(user));
            router.push('/dashboard');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-cinzel text-gold mb-2">Join the Royalty</h2>
                <p className="text-gray-400 font-marcellus text-sm">Step into the world of Encore 26</p>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-marcellus text-gray-300">What shall we call you?</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <Button
                            onClick={handleNext}
                            className="w-full"
                            disabled={!formData.name}
                        >
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-marcellus text-gray-300">Where shall we send your royal decree?</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold h-5 w-5" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">Back</Button>
                            <Button onClick={handleNext} className="flex-1" disabled={!formData.email}>
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2 text-center">
                            <label className="text-sm font-marcellus text-gray-300">Do you require royal quarters?</label>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <button
                                    onClick={() => {
                                        setFormData({ ...formData, accommodation: 'yes' });
                                        setStep(4);
                                    }}
                                    className="p-4 rounded-xl border border-white/10 hover:border-gold/50 hover:bg-gold/10 transition-all group"
                                >
                                    <div className="font-cinzel text-gold text-lg mb-1">Yes</div>
                                    <div className="text-xs text-gray-400 group-hover:text-gray-300">I need accommodation</div>
                                </button>
                                <button
                                    onClick={() => {
                                        setFormData({ ...formData, accommodation: 'no' });
                                        setStep(4);
                                    }}
                                    className="p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                                >
                                    <div className="font-cinzel text-white text-lg mb-1">No</div>
                                    <div className="text-xs text-gray-400 group-hover:text-gray-300">I am a local resident</div>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">Back</Button>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4 text-center">
                            <label className="text-sm font-marcellus text-gray-300">The Royal Treasury</label>
                            <p className="text-gray-400 text-sm max-w-xs mx-auto">
                                To secure your pass, a tribute of <span className="text-gold font-bold">₹1500</span> is required.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="ghost" onClick={() => setStep(3)} className="flex-1">Back</Button>
                            <Button
                                onClick={() => {
                                    // Load Razorpay Script
                                    const script = document.createElement('script');
                                    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                                    script.onload = () => {
                                        const options = {
                                            key: "YOUR_RAZORPAY_KEY_ID_HERE", // Enter the Key ID generated from the Dashboard
                                            amount: 150000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                                            currency: "INR",
                                            name: "Encore 26",
                                            description: "Festival Pass",
                                            image: "/images/logo.png",
                                            handler: function (response: any) {
                                                // alert(response.razorpay_payment_id);
                                                handleNext(); // Proceed to complete login
                                            },
                                            prefill: {
                                                name: formData.name,
                                                email: formData.email,
                                                contact: "9999999999"
                                            },
                                            theme: {
                                                color: "#FFA500"
                                            }
                                        };
                                        // @ts-ignore
                                        const rzp1 = new window.Razorpay(options);
                                        rzp1.open();
                                    };
                                    document.body.appendChild(script);
                                }}
                                className="flex-1 bg-gold hover:bg-gold/90 text-black font-bold"
                            >
                                Pay with Razorpay
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
