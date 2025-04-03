import express from 'express';
import "./configuration/dbConfig.js";  // Ensure the correct path
import router from "./routes/signup.js";
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())

app.use("/user", router);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
