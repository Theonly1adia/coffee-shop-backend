const Router = require('express').Router;
const router = Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;