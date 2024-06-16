"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const arbitrageController_1 = __importDefault(require("../controllers/arbitrageController"));
const router = (0, express_1.Router)();
router.get('/arbitrage', arbitrageController_1.default.getArbitrageOpportunities);
exports.default = router;
