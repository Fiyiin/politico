import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'You are now live',
  });
});

app.listen(3000)
console.log('app running on port ', 3000);