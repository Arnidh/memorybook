'use client';

import { useState, useEffect } from 'react';
import LandingScreen from '@/components/LandingScreen';
import NotebookView from '@/components/NotebookView';
import { fetchPages, markPageAsOpened, fetchFinalPage } from '@/lib/api';
import './globals.css';

export default function Home() {
    const [view, setView] = useState('landing'); // 'landing' | 'notebook'
    const [pages, setPages] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [finalPage, setFinalPage] = useState({ unlocked: 0, content: '' });
    const [showFinalPage, setShowFinalPage] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch initial data
    useEffect(() => {
        async function loadData() {
            const [pagesData, finalPageData] = await Promise.all([
                fetchPages(),
                fetchFinalPage(),
            ]);
            setPages(pagesData);
            setFinalPage(finalPageData);
            setLoading(false);
        }
        loadData();
    }, []);

    const handleOpenNotebook = () => {
        setView('notebook');
    };

    const handleNextPage = () => {
        if (currentPageIndex < pages.length - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
            setShowFinalPage(false);
        } else if (finalPage.unlocked) {
            setShowFinalPage(true);
        }
    };

    const handlePrevPage = () => {
        if (showFinalPage) {
            setShowFinalPage(false);
        } else if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    const handlePageViewed = async (pageId) => {
        const result = await markPageAsOpened(pageId);

        if (result.success) {
            // Update local state
            setPages(pages.map(p =>
                p.id === pageId ? { ...p, opened: 1 } : p
            ));

            // Check if final page was unlocked
            if (result.allOpened) {
                setFinalPage({ ...finalPage, unlocked: 1 });
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">📖</div>
                    <p className="text-2xl font-handwriting text-cream">
                        Loading memories...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen">
            {view === 'landing' ? (
                <LandingScreen onOpenNotebook={handleOpenNotebook} />
            ) : (
                <NotebookView
                    pages={pages}
                    currentPageIndex={currentPageIndex}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                    onPageViewed={handlePageViewed}
                    finalPage={finalPage}
                    showFinalPage={showFinalPage}
                />
            )}
        </main>
    );
}
