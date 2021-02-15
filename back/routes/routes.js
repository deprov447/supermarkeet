// Includes
const express = require("express");
const ejs = require("ejs");


// Presets
const app = express(); 
app.listen(8000);
const frontPath = "../front/pages/";

/************ Routes ****************/

// Index page
app.get("/", (req,res)=>{
    res.render(frontPath+"index.ejs");
});

// Product page for specific product
app.get("/product/:productID", (req,res)=>{
    var productID = req.params.productID;
    res.render(frontPath+"product.ejs",{productID:productID});
});

// Buy page for specific product
app.get("/product/:productID/buy", (req,res)=>{
    var productID = req.params.productID;
    res.render(frontPath+"buy.ejs",{productID:productID});
});

// Categories page
app.get("/categories", (req,res)=>{
    res.render(frontPath+"categories.ejs");
});

//About page
app.get("/about", (req,res)=>{
    res.render(frontPath+"about.ejs");
});

// 404 page
app.get("*",(req,res)=>{
    res.send("404 lost in the depths of internet :/");
})