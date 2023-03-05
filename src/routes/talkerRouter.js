const express = require('express');

const {
    authName,
    authAge,
    authReqTalkerData,
    authWatchedAt,
    authRate } = require('../middlewares/authTalker');
const { authToken } = require('../middlewares/authToken');
const getTalkers = require('../middlewares/getAllTalkers');
const { insertData, insertJson, deleteData } = require('../middlewares/insertData');

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
    const talkers = await getTalkers.getAllTalkers();
    const { name, age, talk } = req.body;
    await insertData(name, age, talk);
    const id = talkers.length + 1;
    const newTalker = { id, name, age, talk };

    return res.status(201).json({ newTalker }.newTalker);
});

router.put('/:id', authToken, authName, authAge, authReqTalkerData, authWatchedAt,
authRate, async (req, res) => {
    const talkers = await getTalkers.getAllTalkers();
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const updateTalker = await talkers.find((talker) => talker.id === Number(id));
    if (!updateTalker) {
        res.status(404).json({ message: 'This id do not match any of our talkers' });
    }
    updateTalker.name = name;
    updateTalker.age = age;
    updateTalker.talk = talk;

    await insertJson(updateTalker);

    res.status(200).json({ updateTalker }.updateTalker);
});

router.delete('/:id', authToken, async (req, res) => {
    await deleteData(req, res);
});

router.get('/search', authToken, async (req, res) => {
    console.log(req);
    console.log(res);
    // configure it
});
  
module.exports = router;
