import express from 'express';
import logger from 'morgan';
import bodyparser from 'body-parser';
import '@babel/polyfill';

import partyRouter from './routes/party';
import officeRouter from './routes/office';
import userRouter from './routes/user';
import voteRouter from './routes/vote';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/api/v1', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to Politico',
  });
});

app.use('/api/v1/parties', partyRouter);
app.use('/api/v1/offices', officeRouter);
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/votes', voteRouter);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Not found! Check that you have the correct url',
  });
});

app.listen(port, () => console.log(`app running on port ${port}`));

export default app;
