const express = require('express');
const getTalkers = require('../helpers/getAllTalkers');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const talker = await getTalkers.getAllTalkers();
    if (talker.lengh !== 0) {
        res.status(200).json({ talker }.talker);
    } else {
        res.status(200).json([]);
    }
  });
  
module.exports = router;
