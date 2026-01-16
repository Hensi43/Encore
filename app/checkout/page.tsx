
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, CreditCard, MapPin, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState("upi"); // upi, cash, card
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch Cart
            const cartRes = await fetch("/api/cart");
            if (cartRes.ok) {
                const data = await cartRes.json();
                setCartItems(data.items || []);
            }
            // Fetch User (simulated from local + session logic effectively)
            // For now, we trust the session on backend, but for UI address display:
            // In a real app we'd fetch /api/user/me. For now, we'll placeholder or just show "Your Profile"
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    const placeOrder = async () => {
        setPlacingOrder(true);
        try {
            const res = await fetch("/api/checkout", { method: "POST" });
            if (res.ok) {
                const data = await res.json();
                router.push(`/orders?success=true&orderId=${data.orderId}`);
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (e) {
            console.error(e);
            alert("Something went wrong.");
        } finally {
            setPlacingOrder(false);
        }
    };

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    if (loading) return <div className="text-center pt-32 text-white">Loading Checkout...</div>;

    return (
        <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 text-black font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Details & Payment */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 1. Delivery Address (User Details) */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold border-b pb-3 mb-4 flex items-center gap-2 text-orange-700">
                            <span className="bg-orange-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                            User Details
                        </h2>
                        <div className="pl-8 text-sm text-gray-700 space-y-1">
                            <p><strong className="text-black">Participant Name</strong></p>
                            <p>IET Lucknow Campus</p>
                            <p>Lucknow, Uttar Pradesh, 226021</p>
                            <p>Phone: +91 XXXXX XXXXX</p>
                            <p className="text-blue-600 hover:underline cursor-pointer text-xs mt-1">Edit details</p>
                        </div>
                    </div>

                    {/* 2. Payment Method */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold border-b pb-3 mb-4 flex items-center gap-2 text-orange-700">
                            <span className="bg-orange-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                            Payment Method
                        </h2>
                        <div className="pl-8 space-y-3">

                            <label className={`block border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="upi"
                                        checked={paymentMethod === 'upi'}
                                        onChange={() => setPaymentMethod('upi')}
                                        className="accent-orange-600 w-4 h-4"
                                    />
                                    <div className="flex-1">
                                        <span className="font-bold block">UPI / QR Code</span>
                                        <span className="text-gray-500 text-xs">PhonePe, Google Pay, Paytm</span>
                                    </div>
                                    <Image src="/images/upi_logo.png" width={40} height={40} alt="UPI" className="opacity-80" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                                </div>
                                {paymentMethod === 'upi' && (
                                    <div className="mt-3 text-sm text-gray-600 bg-white p-3 rounded border border-gray-200">
                                        <p>Scan the generic QR code on the next screen or pay at the desk.</p>
                                    </div>
                                )}
                            </label>

                            <label className={`block border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cash"
                                        checked={paymentMethod === 'cash'}
                                        onChange={() => setPaymentMethod('cash')}
                                        className="accent-orange-600 w-4 h-4"
                                    />
                                    <div className="flex-1">
                                        <span className="font-bold block">Pay on Desk</span>
                                        <span className="text-gray-500 text-xs">Cash payment at the venue</span>
                                    </div>
                                </div>
                            </label>

                        </div>
                    </div>

                    {/* 3. Review Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold border-b pb-3 mb-4 flex items-center gap-2 text-orange-700">
                            <span className="bg-orange-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                            Review Items
                        </h2>
                        <div className="pl-8 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                    <div className="w-20 h-20 relative bg-gray-100 rounded-md overflow-hidden shrink-0">
                                        <Image
                                            src={`/images/event/${item.eventSlug === 'darpan' ? '1' : '2'}.jpg`} // Simplified fallback logic
                                            alt={item.eventName}
                                            fill
                                            className="object-cover"
                                            onError={(e) => (e.target as HTMLImageElement).src = '/images/logo.png'}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{item.eventName}</h4>
                                        <p className="text-green-700 font-bold text-sm">In Stock</p>
                                        <p className="text-gray-500 text-xs">Eligible for FREE Entry</p>
                                        <p className="font-bold text-red-700 mt-1">₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                        <Button
                            onClick={placeOrder}
                            disabled={placingOrder}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black border border-yellow-500 font-normal shadow-sm mb-4 py-1 rounded-md text-sm"
                        >
                            {placingOrder ? "Processing..." : "Place Your Order"}
                        </Button>

                        <p className="text-xs text-center text-gray-500 mb-4 px-2">
                            By placing your order, you agree to Encore's <span className="text-blue-600">Conditions of Use</span> and <span className="text-blue-600">Privacy Notice</span>.
                        </p>

                        <div className="border border-gray-200 rounded-md p-4 bg-gray-50 mb-4">
                            <h3 className="font-bold text-lg mb-3 border-b border-gray-300 pb-2">Order Summary</h3>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span>Items:</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery:</span>
                                    <span>₹0.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total:</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between font-bold text-red-700 text-lg border-t border-gray-300 pt-2 mt-2">
                                    <span>Order Total:</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-3 rounded text-xs text-gray-600">
                            <h4 className="font-bold mb-1">How are shipping costs calculated?</h4>
                            <p>They aren't! Because this is a digital ticket.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
