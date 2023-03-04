const authName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    } if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const authAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    } if (typeof age !== 'number') {
        return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
    } if (!Number.isInteger(age)) {
          return res.status(400).json({
            message: 'O campo "age" deve ser um "number" do tipo inteiro',
        });
    } if (Number(age) < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const authReqTalkerData = (req, res, _next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    } if (!talk.watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    } if (!talk.rate && talk.rate !== 0) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
};

const authWatchedAt = (req, res, next) => {
    const { talk } = req.body;

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const date = new Date(talk.watchedAt);

     if (!`${talk.watchedAt}`.match(regex) && Number.isNaN(date.getTime())) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

const authRate = (req, res, next) => {
    const { talk } = req.body;
if (!Number.isInteger(talk.rate) || Number(talk.rate) < 1 || Number(talk.rate > 5)) {
        return res.status(400).json({
          message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
    next();
};
    
module.exports = {
    authName,
    authAge,
    authReqTalkerData,
    authWatchedAt,
    authRate,
};
