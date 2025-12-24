'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FinalPage({ finalPage }) {
    const [confetti, setConfetti] = useState([]);
    const [showFireworks, setShowFireworks] = useState(false);

    useEffect(() => {
        if (finalPage.unlocked) {
            // Generate confetti
            const pieces = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                animationDuration: 2 + Math.random() * 2,
                animationDelay: Math.random() * 2,
                color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][
                    Math.floor(Math.random() * 5)
                ],
            }));
            setConfetti(pieces);

            // Show fireworks after a delay
            setTimeout(() => setShowFireworks(true), 1000);
        }
    }, [finalPage.unlocked]);

    if (!finalPage.unlocked) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full flex items-center justify-center p-8"
            >
                <div className="max-w-2xl w-full paper-texture rounded-lg shadow-2xl p-12 text-center">
                    <div className="locked">
                        <div className="text-8xl mb-6">🔒</div>
                        <h2 className="text-3xl font-handwriting text-dark-brown mb-4">
                            One More Step...
                        </h2>
                        <p className="text-xl font-serif text-warm-brown">
                            Visit all the memories to unlock the final page
                        </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-8">
                        <div className="flex justify-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-3 h-3 rounded-full bg-warm-brown opacity-30"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full flex items-center justify-center p-8 relative"
        >
            {/* Confetti */}
            {confetti.map((piece) => (
                <div
                    key={piece.id}
                    className="confetti"
                    style={{
                        left: `${piece.left}%`,
                        animationDuration: `${piece.animationDuration}s`,
                        animationDelay: `${piece.animationDelay}s`,
                        background: piece.color,
                    }}
                ></div>
            ))}

            {/* Fireworks effect */}
            {showFireworks && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div className="absolute top-1/4 left-1/4 text-6xl">🎆</div>
                    <div className="absolute top-1/3 right-1/4 text-6xl">🎇</div>
                    <div className="absolute bottom-1/3 left-1/3 text-6xl">✨</div>
                </motion.div>
            )}

            <div className="max-w-3xl w-full paper-texture rounded-lg shadow-2xl p-12 notebook-binding z-10">
                {/* Decorative header */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl mb-4"
                    >
                        🎉
                    </motion.div>
                    <h2 className="text-5xl font-handwriting text-festive-red mb-2">
                        Happy New Year!
                    </h2>
                    <div className="flex justify-center gap-3 text-3xl">
                        <span>🎊</span>
                        <span>✨</span>
                        <span>🎆</span>
                        <span>✨</span>
                        <span>🎊</span>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-6">
                    {finalPage.content.split('\n\n').map((paragraph, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.3, duration: 0.6 }}
                            className="text-2xl handwritten leading-relaxed text-dark-brown"
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </div>

                {/* Signature */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="mt-12 text-right"
                >
                    <p className="text-3xl font-handwriting text-warm-brown">
                        With love ❤️
                    </p>
                </motion.div>

                {/* Decorative footer */}
                <div className="mt-12 pt-8 border-t-2 border-warm-brown border-opacity-20">
                    <div className="flex justify-center gap-4 text-3xl">
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        >
                            🎄
                        </motion.span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        >
                            ⭐
                        </motion.span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        >
                            🎁
                        </motion.span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                        >
                            ⭐
                        </motion.span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
                        >
                            🎄
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
