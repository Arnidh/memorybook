const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchPages() {
    try {
        const response = await fetch(`${API_BASE_URL}/pages`);
        if (!response.ok) throw new Error('Failed to fetch pages');
        return await response.json();
    } catch (error) {
        console.error('Error fetching pages:', error);
        return [];
    }
}

export async function markPageAsOpened(pageId) {
    try {
        const response = await fetch(`${API_BASE_URL}/pages/${pageId}/open`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to mark page as opened');
        return await response.json();
    } catch (error) {
        console.error('Error marking page as opened:', error);
        return { success: false };
    }
}

export async function fetchFinalPage() {
    try {
        const response = await fetch(`${API_BASE_URL}/final-page`);
        if (!response.ok) throw new Error('Failed to fetch final page');
        return await response.json();
    } catch (error) {
        console.error('Error fetching final page:', error);
        return { unlocked: 0, content: '' };
    }
}

export async function unlockFinalPage() {
    try {
        const response = await fetch(`${API_BASE_URL}/final-page/unlock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to unlock final page');
        return await response.json();
    } catch (error) {
        console.error('Error unlocking final page:', error);
        return { success: false };
    }
}
