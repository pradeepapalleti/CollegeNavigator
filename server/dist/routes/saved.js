"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
// Get saved colleges
router.get('/colleges', async (req, res) => {
    try {
        const result = await database_1.default.query(`SELECT c.*, sc.created_at as saved_at FROM saved_colleges sc
       JOIN colleges c ON c.id = sc.college_id
       WHERE sc.user_id = $1 ORDER BY sc.created_at DESC`, [req.userId]);
        res.json({ colleges: result.rows });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Save/unsave a college
router.post('/colleges/:collegeId', async (req, res) => {
    try {
        const { collegeId } = req.params;
        const existing = await database_1.default.query('SELECT id FROM saved_colleges WHERE user_id = $1 AND college_id = $2', [req.userId, collegeId]);
        if (existing.rows.length > 0) {
            await database_1.default.query('DELETE FROM saved_colleges WHERE user_id = $1 AND college_id = $2', [req.userId, collegeId]);
            res.json({ saved: false, message: 'College removed from saved' });
        }
        else {
            await database_1.default.query('INSERT INTO saved_colleges (user_id, college_id) VALUES ($1, $2)', [req.userId, collegeId]);
            res.json({ saved: true, message: 'College saved' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Get saved comparisons
router.get('/comparisons', async (req, res) => {
    try {
        const result = await database_1.default.query('SELECT * FROM saved_comparisons WHERE user_id = $1 ORDER BY created_at DESC', [req.userId]);
        const comparisons = [];
        for (const comp of result.rows) {
            const placeholders = comp.college_ids.map((_, i) => `$${i + 1}`).join(',');
            const colleges = await database_1.default.query(`SELECT id, name, rating, location FROM colleges WHERE id IN (${placeholders})`, comp.college_ids);
            comparisons.push({ ...comp, colleges: colleges.rows });
        }
        res.json({ comparisons });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Save a comparison
router.post('/comparisons', async (req, res) => {
    try {
        const { name, college_ids } = req.body;
        if (!name || !college_ids || college_ids.length < 2) {
            res.status(400).json({ error: 'Name and at least 2 college IDs required' });
            return;
        }
        const result = await database_1.default.query('INSERT INTO saved_comparisons (user_id, name, college_ids) VALUES ($1, $2, $3) RETURNING *', [req.userId, name, college_ids]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Delete a saved comparison
router.delete('/comparisons/:id', async (req, res) => {
    try {
        await database_1.default.query('DELETE FROM saved_comparisons WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
        res.json({ message: 'Comparison deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=saved.js.map