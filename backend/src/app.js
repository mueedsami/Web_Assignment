import express from 'express';
import "./configuration/dbConfig.js";  // Ensure the correct path


const app = express();

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
