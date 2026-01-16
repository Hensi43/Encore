
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Button } from "./Button";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string | React.ReactNode;
    type?: "success" | "error" | "info" | "warning";
    actionLabel?: string;
    onAction?: () => void;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    message,
    type = "info",
    actionLabel,
    onAction,
}: ModalProps) {

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-[#0a0a0a] border border-gold/40 rounded-xl max-w-md w-full p-6 shadow-2xl shadow-gold/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {type === 'error' && <AlertCircle className="text-red-500" size={24} />}
                                {type === 'success' && <CheckCircle className="text-green-500" size={24} />}
                                {type === 'info' && <Info className="text-blue-500" size={24} />}
                                <h3 className="text-2xl font-cinzel text-gold">{title}</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="mb-6">
                            <p className="text-gray-300 font-marcellus leading-relaxed">
                                {message}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={onClose} className="border-white/20 text-gray-300 hover:bg-white/10">
                                Close
                            </Button>
                            {actionLabel && onAction && (
                                <Button variant="primary" onClick={onAction}>
                                    {actionLabel}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
