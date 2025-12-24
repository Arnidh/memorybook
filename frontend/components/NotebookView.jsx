'use client';

import { motion, AnimatePresence } from 'framer-motion';
import MemoryPage from './MemoryPage';
import FinalPage from './FinalPage';

export default function NotebookView({
    pages,
    currentPageIndex,
    onNextPage,
    onPrevPage,
    onPageViewed,
    finalPage,
    showFinalPage,
}) {
    const currentPage = showFinalPage ? null : pages[currentPageIndex];
    const totalPages = pages.length + 1; // +1 for final page

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
        >
            {/* Notebook container */}
            <div className="w-full max-w-6xl h-[80vh] relative">
                {/* Page content */}
                <AnimatePresence mode="wait">
                    {showFinalPage ? (
                        <FinalPage key="final" finalPage={finalPage} />
                    ) : (
                        <MemoryPage
                            key={currentPage?.id}
                            page={currentPage}
                            onPageViewed={onPageViewed}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation controls */}
            <div className="mt-8 flex items-center gap-6">
                {/* Previous button */}
                <button
                    onClick={onPrevPage}
                    disabled={currentPageIndex === 0 && !showFinalPage}
                    className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    ← Previous
                </button>

                {/* Page indicators */}
                <div className="flex items-center gap-2">
                    {pages.map((page, index) => (
                        <div
                            key={page.id}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentPageIndex && !showFinalPage
                                    ? 'bg-festive-red scale-125'
                                    : page.opened
                                        ? 'bg-festive-green'
                                        : 'bg-warm-brown opacity-30'
                                }`}
                            title={page.opened ? 'Viewed' : 'Not viewed'}
                        ></div>
                    ))}
                    {/* Final page indicator */}
                    <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${showFinalPage
                                ? 'bg-gold scale-125'
                                : finalPage.unlocked
                                    ? 'bg-gold'
                                    : 'bg-warm-brown opacity-30'
                            }`}
                        title={finalPage.unlocked ? 'Unlocked!' : 'Locked'}
                    ></div>
                </div>

                {/* Next button */}
                <button
                    onClick={onNextPage}
                    disabled={showFinalPage}
                    className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    Next →
                </button>
            </div>

            {/* Page counter */}
            <div className="mt-4 text-cream font-serif opacity-70">
                Page {showFinalPage ? totalPages : currentPageIndex + 1} of {totalPages}
            </div>

            {/* Unlock notification */}
            {finalPage.unlocked && !showFinalPage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gold bg-opacity-20 border-2 border-gold rounded-lg"
                >
                    <p className="text-cream font-handwriting text-xl text-center">
                        ✨ The final page has been unlocked! ✨
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
