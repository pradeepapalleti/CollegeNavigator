"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// List colleges with search, filter, pagination
router.get('/', auth_1.optionalAuth, async (req, res) => {
    try {
        const { search, location, fees_max, course, page = '1', limit = '12', sort = 'rating' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const offset = (pageNum - 1) * limitNum;
        let whereConditions = [];
        let params = [];
        let paramIndex = 1;
        if (search) {
            whereConditions.push(`c.name ILIKE $${paramIndex}`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        if (location) {
            whereConditions.push(`(c.city ILIKE $${paramIndex} OR c.state ILIKE $${paramIndex})`);
            params.push(`%${location}%`);
            paramIndex++;
        }
        if (fees_max) {
            whereConditions.push(`c.fees_min <= $${paramIndex}`);
            params.push(parseInt(fees_max));
            paramIndex++;
        }
        if (course) {
            whereConditions.push(`EXISTS (SELECT 1 FROM courses co WHERE co.college_id = c.id AND co.name ILIKE $${paramIndex})`);
            params.push(`%${course}%`);
            paramIndex++;
        }
        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
        const sortOptions = {
            rating: 'c.rating DESC',
            fees_low: 'c.fees_min ASC',
            fees_high: 'c.fees_max DESC',
            name: 'c.name ASC',
            placement: 'c.placement_rate DESC NULLS LAST',
        };
        const orderBy = sortOptions[sort] || 'c.rating DESC';
        const countResult = await database_1.default.query(`SELECT COUNT(*) FROM colleges c ${whereClause}`, params);
        const total = parseInt(countResult.rows[0].count);
        const result = await database_1.default.query(`SELECT c.*, 
        CASE WHEN $${paramIndex}::int IS NOT NULL THEN EXISTS(SELECT 1 FROM saved_colleges sc WHERE sc.college_id = c.id AND sc.user_id = $${paramIndex}::int) ELSE false END as is_saved
       FROM colleges c ${whereClause} ORDER BY ${orderBy} LIMIT $${paramIndex + 1} OFFSET $${paramIndex + 2}`, [...params, req.userId || null, limitNum, offset]);
        res.json({
            colleges: result.rows,
            pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
        });
    }
    catch (error) {
        console.error('List colleges error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Get distinct locations and courses for filter options
router.get('/filters', async (_req, res) => {
    try {
        const locations = await database_1.default.query('SELECT DISTINCT state FROM colleges ORDER BY state');
        const courses = await database_1.default.query('SELECT DISTINCT name FROM courses ORDER BY name');
        res.json({ locations: locations.rows.map((r) => r.state), courses: courses.rows.map((r) => r.name) });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Get single college detail
router.get('/:id', auth_1.optionalAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const college = await database_1.default.query(`SELECT c.*, 
        CASE WHEN $2::int IS NOT NULL THEN EXISTS(SELECT 1 FROM saved_colleges sc WHERE sc.college_id = c.id AND sc.user_id = $2::int) ELSE false END as is_saved
       FROM colleges c WHERE c.id = $1`, [id, req.userId || null]);
        if (college.rows.length === 0) {
            res.status(404).json({ error: 'College not found' });
            return;
        }
        const courses = await database_1.default.query('SELECT * FROM courses WHERE college_id = $1 ORDER BY degree_type, name', [id]);
        const placements = await database_1.default.query('SELECT * FROM placements WHERE college_id = $1 ORDER BY year DESC', [id]);
        const reviews = await database_1.default.query('SELECT * FROM reviews WHERE college_id = $1 ORDER BY created_at DESC', [id]);
        res.json({ ...college.rows[0], courses: courses.rows, placements: placements.rows, reviews: reviews.rows });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Compare colleges
router.post('/compare', async (req, res) => {
    try {
        const { college_ids } = req.body;
        if (!college_ids || !Array.isArray(college_ids) || college_ids.length < 2 || college_ids.length > 3) {
            res.status(400).json({ error: 'Provide 2-3 college IDs' });
            return;
        }
        const placeholders = college_ids.map((_, i) => `$${i + 1}`).join(',');
        const colleges = await database_1.default.query(`SELECT * FROM colleges WHERE id IN (${placeholders}) ORDER BY rating DESC`, college_ids);
        const result = [];
        for (const college of colleges.rows) {
            const courses = await database_1.default.query('SELECT * FROM courses WHERE college_id = $1', [college.id]);
            const latestPlacement = await database_1.default.query('SELECT * FROM placements WHERE college_id = $1 ORDER BY year DESC LIMIT 1', [college.id]);
            result.push({ ...college, courses: courses.rows, latest_placement: latestPlacement.rows[0] || null });
        }
        res.json({ colleges: result });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.default = router;
