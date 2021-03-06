var mongoose =require("mongoose");

var productSchema = new mongoose.Schema({
    productID: Number,
    productName: String,
    productQuantity: Number,
    productMRP: Number
});

var Product = mongoose.model("Product", productSchema);

module.exports= Product;