const express = require('express');
const crypto = require('crypto');
const { authRequired, authEmail, authPassword } = require('../helpers/authData');

const router = express.Router();

router.post('/', authRequired, authPassword, authEmail, (req, res) => {
  // Verify if email and password are correct.

  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
  });

module.exports = router;
