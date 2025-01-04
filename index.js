const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const app = express();
const port = 3004;

require('dotenv').config()

const mongoUrl = process.env.MONGO_URL

// Middleware to parse JSON bodies
app.use(express.json());
/* app.use('/product', productRoutes) */


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

  // Use the product and auth routes
app.use('/product', productRoutes);
app.use('/auth', authRoutes);

// Protect product routes
app.use('/product', auth, productRoutes);
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });