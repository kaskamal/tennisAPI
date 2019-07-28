import * as express from 'express';
import { rankingsManager } from '../model/rankingsManager';

const router = express.Router();
export default router;

let rankingManager: rankingsManager = new rankingsManager(router);

rankingManager.extractRankings("singles");
rankingManager.extractRankings("doubles");




