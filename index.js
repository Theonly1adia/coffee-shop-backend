const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const userRoutes= require('./routes/users');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const port = 3004;

require('dotenv').config()

const mongoUrl = process.env.MONGO_URL

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
/* app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); */
app.use('/uploads', express.static('/tmp'));



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
app.use('/users', auth, userRoutes);


// Use the error handling middleware
app.use(errorHandler);
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });