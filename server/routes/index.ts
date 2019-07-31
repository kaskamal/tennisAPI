import * as express from 'express';
import rankings from './rankings';
import fs = require('fs');

const router = express.Router();

export default router;

// Respond to root with home html page
router.get("/", (req, res) => {
    const path = "public/html/index.html";
    fs.readFile(path, (err: Error, file: Buffer) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.write(file);
            res.end();
        }
    });
});


router.use("/", rankings);