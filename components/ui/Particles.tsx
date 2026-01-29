"use client";

import { useEffect, useRef } from 'react';

export default function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; speed: number; size: number; opacity: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const particleCount = Math.min(window.innerWidth / 10, 100);
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 0.5 + 0.1,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFD700'; // Gold

            particles.forEach((p, i) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.globalAlpha = p.opacity;
                ctx.fill();

                // Move upwards
                p.y -= p.speed;

                // Reset if out of view
                if (p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(drawParticles);
        };

        resize();
        createParticles();
        drawParticles();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    );
}
