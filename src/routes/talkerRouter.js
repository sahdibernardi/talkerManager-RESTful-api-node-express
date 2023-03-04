const express = require('express');
const {
    authName,
    authAge,
    authReqTalkerData,
    authWatchedAt,
    authRate } = require('../helpers/authTalker');
const { authToken } = require('../helpers/authToken');
const getTalkers = require('../helpers/getAllTalkers');

const router = express.Router();

router.get('/', async (req, res) => {
    const talker = await getTalkers.getAllTalkers();
    if (talker.lenght !== 0) {
        res.status(200).json({ talker }.talker);
    } else {
        res.status(200).json([]);
    }
  });

router.get('/:id', async (req, res) => {
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

router.post('/', authToken, authName, authAge, authReqTalkerData, authWatchedAt,
authRate, async (req, res) => {
    const talker = await getTalkers.getAllTalkers();
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const id = talker.length + 1;
    const newTalker = { id, name, age, talk: { watchedAt, rate } };
    talker.push(newTalker);

    res.status(201).json(newTalker);
});
  
module.exports = router;
