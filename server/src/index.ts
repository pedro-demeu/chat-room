import express from 'express';
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});