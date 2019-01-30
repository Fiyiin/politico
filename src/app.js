import express from 'express';
import logger from 'morgan';
import bodyparser from 'body-parser';
import partyRouter from './routes/party';
import officeRouter from './routes/office';


const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'You are now live',
  });
});

app.use('/api/v1/parties', partyRouter);
app.use('/api/v1/offices', officeRouter);


app.listen(port, () => console.log(`app running on port ${port}`));

export default app;
