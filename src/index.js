const express = require('express');

const talkerRouter = require('./routes/talkerRouter');
// const loginRouter = require('./routes/loginRouter');

const app = express();
app.use(express.json());
// confirm if it should be before or after the previous use.
app.use(talkerRouter);
// app.use(loginRouter);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// DO NOT REMOVE THE FOLLOWING ENDPOINTS, IT SET'S THE EVALUATOR TO WORK.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
