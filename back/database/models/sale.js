var mongoose =require("mongoose");

var saleSchema = new mongoose.Schema({
    productID: Number,
    productName: String,
    productQuantitySold: String,
    productProfit: Number,
    productSaleTime: Date
});

var Sale = mongoose.model("Sale", saleSchema);

module.exports= Sale;