import express from 'express';
import "./configuration/dbConfig.js";  // Ensure the correct path
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import bodyParser from 'body-parser';
import cors from 'cors';




const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use("/user", signupRoute);
app.use("/auth", loginRoute);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
