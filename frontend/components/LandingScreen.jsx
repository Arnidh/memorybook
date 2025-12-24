'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LandingScreen({ onOpenNotebook }) {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        // Generate snowflakes
        const flakes = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 10 + Math.random() * 20,
            animationDelay: Math.random() * 10,
            fontSize: 0.5 + Math.random() * 1,
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Snowflakes */}
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        fontSize: `${flake.fontSize}em`,
                    }}
                >
                    ❄
                </div>
            ))}

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-center z-10 px-4"
            >
                {/* Notebook illustration */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenNotebook}
                    className="cursor-pointer mb-8 inline-block"
                >
                    <div className="relative">
                        {/* Notebook cover */}
                        <div className="w-64 h-80 bg-gradient-to-br from-festive-red to-red-900 rounded-lg shadow-2xl relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-4 left-4 text-6xl">🎄</div>
                                <div className="absolute bottom-4 right-4 text-6xl">✨</div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
                                    ⭐
                                </div>
                            </div>

                            {/* Notebook title */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <h2 className="text-3xl font-handwriting text-cream mb-2">
                                        Our Year
                                    </h2>
                                    <p className="text-lg font-handwriting text-cream opacity-90">
                                        2025
                                    </p>
                                </div>
                            </div>

                            {/* Notebook binding */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-600 to-transparent"></div>
                        </div>

                        {/* Glow effect */}
                        <motion.div
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute inset-0 bg-gold rounded-lg blur-xl -z-10 opacity-50"
                        ></motion.div>
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <h1 className="text-4xl md:text-5xl font-handwriting text-cream mb-4">
                        I wrote this year down for you.
                    </h1>
                    <p className="text-xl font-serif text-cream opacity-80 mb-8">
                        Click the notebook to open it.
                    </p>

                    {/* Sparkles */}
                    <div className="flex justify-center gap-4 text-3xl">
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        >
                            ✨
                        </motion.span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        >
                            ⭐
                        </motion.span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                        >
                            ✨
                        </motion.span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
