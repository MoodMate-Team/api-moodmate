import express from 'express';
import { getWeeklyInsights } from '../controllers/insight.controller.js';
import { triggerWeeklyManually } from '../jobs/hf-scheduler.js';
import requireAuth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/weekly', requireAuth, getWeeklyInsights);
router.post('/weekly-trigger', requireAuth, triggerWeeklyManually);

export default router;