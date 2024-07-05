const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(8080, () => {
  console.log('Listening on port 8080!');
});

app.get('/', (req, res) => {

  res.send('Hello World!');
});
