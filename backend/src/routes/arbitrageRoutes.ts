import { Router } from 'express';
import ArbitrageController from '../controllers/arbitrageController';

const router = Router();

router.get('/arbitrage', ArbitrageController.getArbitrageOpportunities);

export default router;
