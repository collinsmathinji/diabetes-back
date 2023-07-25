require('dotenv').config();
const cors=require('cors')
const express = require('express');
const mongoose = require('mongoose');
const diabeticStatsRoutes = require('./routes/diabeticStatsRoutes.js'); // Update the import to the diabeticStatsRoutes file
const userRoutes = require('./routes/user.js');

// express app
const app = express();


app.use(express.json());

app.use(cors({ origin: 'https://vercel.com/collinsmathinji/frontend-diabetes/8y9ZwURrGsX9Q4DFz8DwU5C7FewZ' }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use('/api/diabeticStats', diabeticStatsRoutes); // Update the route for diabeticStats
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
