const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const products = require("./models/products");

require('dotenv').config()

const mongoUrl = process.env.MONGO_URL

// Middleware to parse JSON bodies
app.use(express.json());



// Connect to MongoDB
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const productRoutes = require('./routes/products');

  app.use('/products', productRoutes);

  app.get('/', async (req, res) => {
      res.json({message: 'Get all products'});
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });