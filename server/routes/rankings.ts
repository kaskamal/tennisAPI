import * as express from 'express';
import { rankingsManager } from '../model/rankingsManager';
import { RankRange } from '../model/util';

const router = express.Router();
export default router;

let rankingManager: rankingsManager = new rankingsManager(router);

rankingManager.extractRankings("singles", "2019-07-01", new RankRange(0, 10));
rankingManager.extractRankings("doubles", "2019-07-01", new RankRange(0, 10));




