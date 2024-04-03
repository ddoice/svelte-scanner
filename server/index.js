const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.post('/log', (req, res) => {
  console.log(req.body);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});