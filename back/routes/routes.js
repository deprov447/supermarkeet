// Includes
const express       = require("express"),
      ejs           = require("ejs"),
      path          = require("path"),
      methOvr       = require("method-override");
const { Mongoose }  = require("mongoose"),
      bodyParser    = require("body-parser"),
      passport      = require("passport"),
      passportLocalMongoose = require('passport-local-mongoose'),
      connectEnsureLogin = require('connect-ensure-login');
      

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});


const Employee = require("./../database/models/employees");
const Product = require("./../database/models/products");
const UserDetails = require("./../database/models/admin")

// 
// UserDetails.register({username:'paul', active: false}, 'paul');
// UserDetails.register({username:'jay', active: false}, 'jay');
// UserDetails.register({username:'roy', active: false}, 'roy');
// 


// Presets
const app = express(); 
app.listen(8000);
app.use(express.static(path.join(__dirname, '../../front/')));
const frontPath = "../front/pages/";
app.use(bodyParser.urlencoded({extended: true}));
app.use(methOvr("_method"));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());


/* PASSPORT LOCAL AUTHENTICATION */

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());


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


app.get("/admin/sale",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
    Product.find(function (err,data) {
        if(err) 
            return console.log(err);
        console.log(data)
        res.render(frontPath+"admin-sale.ejs",{data:data})
    })
})

app.get("/admin/employees",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{

    Employee.find(function (err,data) {
        if(err) 
            return console.log(err);
        // console.log(data)
        res.render(frontPath+"admin-employee.ejs",{data:data})
    })

})
    app.post("/admin/employees",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
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
    app.post("/admin/employees/delete",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
        var id = req.body.id;
        Employee.findByIdAndDelete(id,()=>{
            console.log("deleted");
            // console.log(req.body)
            // console.log("hello")
            res.redirect("/admin/employees")
        })
    })


app.get("/admin/products",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
    Product.find(function (err,data) {
        if(err) 
            return console.log(err);
        // console.log(data)
        res.render(frontPath+"admin-products.ejs",{data:data})
    })
})
    app.post("/admin/products",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
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
    app.post("/admin/products/delete",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
        var id = req.body.id;
        Product.findByIdAndDelete(id,()=>{
            console.log("deleted");
            // console.log(req.body)
            // console.log("hello")
            res.redirect("/admin/products")
        })
    })


app.get("/admin/employee-sale",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
    Employee.find(function (err,dataEmp) {
        if(err) 
            return console.log(err);
    Product.find(function (err,dataPro) {
                if(err) 
                    return console.log(err);
                    res.render(frontPath+"admin-employee-sale.ejs",{dataEmp:dataEmp,dataPro:dataPro})
            })
    })
})


//About page
app.get("/about", (req,res)=>{
    res.render(frontPath+"about.ejs");
});

//SignUp
app.get("/wrongCred", (req,res)=>{
    res.send("wrong credentials + <a href='/admin/'>login again</a>");
});
//Login
app.get("/login", (req,res)=>{
    res.render(frontPath+"login.ejs");
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
    if (err) {
        return next(err);
    }

    if (!user) {
        return res.redirect('/wrongCred/');
    }

    req.logIn(user, function(err) {
        if (err) {
        return next(err);
        }

        return res.redirect('/admin/');
    });

    })(req, res, next);
});

// 404 page
app.get("*",(req,res)=>{
    res.send("404 lost in the depths of internet :/");
})