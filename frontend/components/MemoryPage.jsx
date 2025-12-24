'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BACKEND_URL } from '@/lib/api';

export default function MemoryPage({ page, onPageViewed }) {
    const handlePageView = () => {
        if (!page.opened) {
            onPageViewed(page.id);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center p-8"
            onAnimationComplete={handlePageView}
        >
            <div className="max-w-4xl w-full h-full paper-texture rounded-lg shadow-2xl p-8 md:p-12 notebook-binding overflow-y-auto">
                {/* Page number */}
                <div className="text-right mb-4">
                    <span className="text-sm font-serif text-warm-brown opacity-60">
                        Page {page.pageNumber}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-handwriting text-dark-brown mb-2">
                    {page.title}
                </h2>

                {/* Date */}
                <p className="text-lg font-serif text-warm-brown mb-8 opacity-80">
                    {page.date}
                </p>

                {/* Content */}
                {page.type === 'image' && (
                    <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={`${BACKEND_URL}/images/${page.content}`}
                            alt={page.title}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                            unoptimized
                        />
                    </div>
                )}

                {page.type === 'text' && (
                    <div className="mb-6 text-2xl handwritten">
                        {page.content}
                    </div>
                )}

                {/* Caption */}
                {page.caption && (
                    <div className="mt-6 p-6 bg-cream bg-opacity-50 rounded-lg border-l-4 border-festive-red">
                        <p className="text-lg handwritten leading-relaxed">
                            {page.caption}
                        </p>
                    </div>
                )}

                {/* Decorative elements */}
                <div className="mt-8 flex justify-center gap-4 text-2xl opacity-40">
                    <span>🎄</span>
                    <span>✨</span>
                    <span>❤️</span>
                    <span>✨</span>
                    <span>🎄</span>
                </div>
            </div>
        </motion.div>
    );
}
