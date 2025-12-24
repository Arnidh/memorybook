const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET /api/pages - Fetch all memory pages
router.get('/pages', (req, res) => {
    db.all('SELECT * FROM pages ORDER BY pageNumber', (err, rows) => {
        if (err) {
            console.error('Error fetching pages:', err);
            return res.status(500).json({ error: 'Failed to fetch pages' });
        }
        res.json(rows);
    });
});

// POST /api/pages/:id/open - Mark a page as opened
router.post('/pages/:id/open', (req, res) => {
    const { id } = req.params;

    db.run('UPDATE pages SET opened = 1 WHERE id = ?', [id], function (err) {
        if (err) {
            console.error('Error updating page:', err);
            return res.status(500).json({ error: 'Failed to update page' });
        }

        // Check if all pages are opened
        db.get('SELECT COUNT(*) as total, SUM(opened) as openedCount FROM pages', (err, row) => {
            if (err) {
                console.error('Error checking pages:', err);
                return res.status(500).json({ error: 'Failed to check pages' });
            }

            const allOpened = row.total === row.openedCount;

            // If all pages are opened, unlock final page
            if (allOpened) {
                db.run('UPDATE final_page SET unlocked = 1 WHERE id = 1', (err) => {
                    if (err) {
                        console.error('Error unlocking final page:', err);
                    } else {
                        console.log('Final page unlocked!');
                    }
                });
            }

            res.json({
                success: true,
                allOpened,
                openedCount: row.openedCount,
                total: row.total
            });
        });
    });
});

// GET /api/final-page - Get final page status and content
router.get('/final-page', (req, res) => {
    db.get('SELECT * FROM final_page WHERE id = 1', (err, row) => {
        if (err) {
            console.error('Error fetching final page:', err);
            return res.status(500).json({ error: 'Failed to fetch final page' });
        }
        res.json(row || { unlocked: 0, content: '' });
    });
});

// POST /api/final-page/unlock - Manually unlock final page (backup endpoint)
router.post('/final-page/unlock', (req, res) => {
    db.run('UPDATE final_page SET unlocked = 1 WHERE id = 1', function (err) {
        if (err) {
            console.error('Error unlocking final page:', err);
            return res.status(500).json({ error: 'Failed to unlock final page' });
        }
        res.json({ success: true });
    });
});

module.exports = router;
