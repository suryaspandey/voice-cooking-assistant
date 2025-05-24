require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');

const recipeRoutes= require('./routes/recipeRoutes');
const authRoutes= require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
// app.use((req, res, next) => {
//   next();
// });

const port= 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("Error connecting to MongoDB Atlas:", err);
});
  
app.use(cors());
app.use(express.json()); // for parsing JSON data in requests


app.use('/api',recipeRoutes);
app.use('/api/auth', authRoutes);


const isAuth = require('./middleware/authMiddleware');
app.get('/api/secure-data', isAuth, (req, res) => {
  res.json({ message: `Hello User ${req.user.userId}` });
});

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})