const express = require('express');
const getTalkers = require('../helpers/getAllTalkers');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const talker = await getTalkers.getAllTalkers();
    if (talker.lenght !== 0) {
        res.status(200).json({ talker }.talker);
    } else {
        res.status(200).json([]);
    }
  });

router.get('/talker/:id', async (req, res) => {
const talker = await getTalkers.getAllTalkers();
const { id } = req.params;
const filtered = talker.find((t) => t.id === Number(id));
if (filtered) {
    res.status(200).json({ filtered }.filtered);
} else {
    res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
}
});
  
module.exports = router;
