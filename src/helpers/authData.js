const authRequired = (req, res, next) => {
    const { email, password } = req.body;
    const requiredProperties = ['email', 'password'];
    if (requiredProperties.every((property) => property in req.body)) {
        next();
    }
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
};

const authEmail = (req, res, next) => {
    const { email } = req.body;
    // const email = ['email'];
    if (email === null) {
        next();
    }
    if (!`${email}`.match(/\S+@\S+\.\S+/)) {
        return res.status(400).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }
    next();
};

const authPassword = (req, res, next) => {
    const { password } = req.body;
    // const password = ['password'];
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};
    
module.exports = {
    authRequired,
    authEmail,
    authPassword,
};
