const Joi = require('joi');
const { deleteFile } = require('../cloudinary');

// Joi schema for validating product data from form multipart/form-data
const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  stock: Joi.number(),
  imageUrl: Joi.string().uri(),
});

async function validateProduct(req, res, next) {
  console.log('Validating product data...');
  console.log(req.body);

  try {
    const { error } = schema.validate({...req.body, imageUrl: req.file ? req.file.path : undefined});
    if (error) {
      console.log(error);
      // Delete the uploaded image if validation fails
      if(req.file) {
        console.log('Deleting uploaded image...');
        await deleteFile(req.file.filename);
        console.log('Image deleted');
      }
      return res.status(400).json({ error: 'Validation error' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Validation error' });
  }

  next();
}

module.exports = validateProduct;