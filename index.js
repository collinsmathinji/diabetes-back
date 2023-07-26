require('dotenv').config();
const cors=require('cors')
const express = require('express');
const mongoose = require('mongoose');
const diabeticStatsRoutes = require('./routes/diabeticStatsRoutes.js'); 
const userRoutes = require('./routes/user.js');

// express app
const app = express();


app.use(express.json());

app.use(cors({
  origin: "https://frontend-diabetes-bocyxfdb7-collinsmathinji.vercel.app"
}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use('/api/diabeticStats', diabeticStatsRoutes); 
app.use('/api/user', userRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
