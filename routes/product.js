const Router = require('express').Router;
const router = Router();
const Product = require('../models/product'); //Import product model

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