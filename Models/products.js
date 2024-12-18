const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name: {type:String, required:true},
    description:{type:String, required: true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    stock:{type:Number, required:false},
    imageUrl:{type:String, required:false}
})