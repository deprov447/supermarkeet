// Includes
const express       = require("express"),
      ejs           = require("ejs"),
      path          = require("path"),
      methOvr       = require("method-override");
const { Mongoose } = require("mongoose");
      bodyParser    = require("body-parser");


const Employee = require("./../database/models/employees");
const Product = require("./../database/models/products");


// Presets
const app = express(); 
app.listen(8000);
app.use(express.static(path.join(__dirname, '../../front/')));
const frontPath = "../front/pages/";
app.use(bodyParser.urlencoded({extended: true}));
app.use(methOvr("_method"));


/************ Routes ****************/

// Index page
app.get("/", (req,res)=>{
    res.redirect("/index");
});
    app.get("/index", (req,res)=>{
        res.render(frontPath+"index.ejs");
    });

    //index-post
    app.post("/index/post", (req,res)=>{
        console.log(req.body)
        if(req.body.accessType == 'customer')
            res.redirect("/customer");
        else
        {
            res.redirect("/admin")
        }
    });



app.get("/customer",(req,res)=>{
    res.render(frontPath+"customer.ejs")
})


app.get("/admin",(req,res)=>{
    res.render(frontPath+"admin.ejs")
})
    app.post("/admin",(req,res)=>{
        console.log(req.body);
        res.redirect("/admin")
    })
    app.delete("/admin/sale",(req,res)=>{
        console.log(req.body);
        res.redirect("/admin/sale")
    })


app.get("/admin/sale",(req,res)=>{
    res.render(frontPath+"admin-sale.ejs")
})

app.get("/admin/employees",(req,res)=>{

    Employee.find(function (err,data) {
        if(err) 
            return console.log(err);
        console.log(data)
        res.render(frontPath+"admin-employee.ejs",{data:data})
    })

})
    app.post("/admin/employees",(req,res)=>{
        const newEmployee = new Employee(
            {
                employeeID:req.body.employeeID,
                employeeName:req.body.employeeName,
                employeeDesgn:req.body.employeeDesgn,
                employeeSalary:req.body.employeeSalary
            }
        )
        newEmployee.save().then(()=>console.log("new employee saved"+req.body))

        res.redirect("/admin/employees")
    })


app.get("/admin/products",(req,res)=>{
    Product.find(function (err,data) {
        if(err) 
            return console.log(err);
        console.log(data)
        res.render(frontPath+"admin-products.ejs",{data:data})
    })
})
    app.post("/admin/products",(req,res)=>{
        const newProduct = new Product(
            {
                productID: req.body.productID,
                productName: req.body.productName,
                productQuantity: req.body.productQuantity,
                productMRP: req.body.productMRP
            }
        )
        newProduct.save().then(()=>console.log("new product saved"))
        res.redirect("/admin/products")
    })
    app.delete("/admin/products",(req,res)=>{
        console.log(req.body);
        res.redirect("/admin/products")
    })


app.get("/admin/employee-sale",(req,res)=>{
    res.render(frontPath+"admin-employee-sale.ejs")
})


//About page
app.get("/about", (req,res)=>{
    res.render(frontPath+"about.ejs");
});

// 404 page
app.get("*",(req,res)=>{
    res.send("404 lost in the depths of internet :/");
})