import * as express from 'express';
import rankings from './rankings';

const router = express.Router();

export default router;

router.get("/", (req, res) => {
    res.status(200).json({message: 'Connected'})
})


router.use("/", rankings);