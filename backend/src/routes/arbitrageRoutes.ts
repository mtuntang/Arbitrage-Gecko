import { Router } from 'express';
import ArbitrageController from '../controllers/arbitrageController';

const router = Router();

router.get('/arbitrage', ArbitrageController.getArbitrageOpportunities);
router.get('/historical', ArbitrageController.getHistoricalData);

export default router;
