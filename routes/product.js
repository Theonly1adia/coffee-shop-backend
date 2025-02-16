const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); //Import product model
const upload = require('../../middleware/upload');



// Get all products
router.get('/', async (req, res) => {
  try{
    const product = await Product.find();
    res.json(product);
  } catch (error){
    res.status(500).json({error: error.message});
  }
});

//Get a single product by ID
router.get('/:id', async(req, res) =>{
  try{
    const product = await Product.findById(req.params.id);
    res.json(product);
  }catch (error){
    res.status(500).json({error: error.message});
  }
});

//Create a new product
router.post('/', async (req, res) => {
  try{
    const { name, description, price, category, stock, imageUrl } = req.body;
    
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });
    
    const savedProduct= await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Create a new product with image upload
router.post('/', upload, async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products with pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      sortBy,
      sortOrder = 'asc',
    } = req.query;
    const filter = category ? { category } : {};
    const sort = sortBy ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 } : {};
    const products = await Product.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    const total = await Product.countDocuments(filter);
    res.json({ total, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products or filter by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const product = await Product.find(filter);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update a product by ID
router.put('/:id', async(req, res) =>{
  try{
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true, runValidators: true}
    );
    if (!product) {
      return res.status(404).json({error:'Product not found'});
    }
    res.json(product);
  }catch (error) {
    res.status(400).json({error:error.message});
  }
});

router.delete('/:id', async(req,res) => {
  try{
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({message: 'Product deleted successfully.'});
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});



module.exports = router;