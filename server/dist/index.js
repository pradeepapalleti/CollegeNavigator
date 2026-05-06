"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const migrate_1 = __importDefault(require("./db/migrate"));
const seed_1 = __importDefault(require("./db/seed"));
const auth_1 = __importDefault(require("./routes/auth"));
const colleges_1 = __importDefault(require("./routes/colleges"));
const saved_1 = __importDefault(require("./routes/saved"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use((0, cors_1.default)({ origin: corsOrigin, credentials: true }));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/colleges', colleges_1.default);
app.use('/api/saved', saved_1.default);
// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
const start = async () => {
    try {
        await (0, migrate_1.default)();
        console.log('📦 Database tables ready');
        // Check if we need to seed
        const { Pool } = require('pg');
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const count = await pool.query('SELECT COUNT(*) FROM colleges');
        if (parseInt(count.rows[0].count) === 0) {
            console.log('🌱 Seeding database...');
            await (0, seed_1.default)();
        }
        else {
            console.log(`📊 Database has ${count.rows[0].count} colleges`);
        }
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map