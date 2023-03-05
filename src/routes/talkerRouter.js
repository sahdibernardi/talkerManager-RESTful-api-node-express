const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const fileName = './talker.json';
// const file = require('../talker.json');

const {
    authName,
    authAge,
    authReqTalkerData,
    authWatchedAt,
    authRate } = require('../middlewares/authTalker');
const { authToken } = require('../middlewares/authToken');
const getTalkers = require('../middlewares/getAllTalkers');
const insertData = require('../middlewares/insertData');

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
    const { name, age, talk } = req.body;
    const talkers = await insertData(name, age, talk);
    const l = talkers.lenght;
    let id = 5;
    if (l !== undefined) {
        id = talkers[l - 1];
    }
    const newTalker = { id, name, age, talk };
    console.log(newTalker);
    await console.log(talkers);
    return res.status(201).json({ newTalker }.newTalker);
});
  
module.exports = router;
