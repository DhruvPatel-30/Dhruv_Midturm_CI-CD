const express = require('express');
const { add, subtract, multiply, divide } = require('./src/math');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: "This is App fo my mid exam_Dhruv 9062297", version: "1.0.0" });
});

app.get('/math/add', (req, res) => {
  const a = Number(req.query.a || 0);
  const b = Number(req.query.b || 0);
  res.json({ result: add(a, b) });
});

app.get('/math/divide', (req, res) => {
  const a = Number(req.query.a || 0);
  const b = Number(req.query.b || 1);
  try {
    res.json({ result: divide(a, b) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
