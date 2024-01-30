import express from 'express';
import cors from 'cors';

import calculationsRouter from './routes/calculations.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/calculations', calculationsRouter);

app.get('/', (req, res) => {
  res.send(
    'Go to <a href="/calculations">page with the outcomes of calculations</a>'
  );
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
