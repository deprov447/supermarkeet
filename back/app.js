// Includes
const mongoose = require("mongoose");

// Presets
// mongoose.connect('mongodb+srv://deprov447:mongo_password@localhost/supermarkeetDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const url = `mongodb://sammy:your_password@127.0.0.1:27017/supermarkeet?authSource=admin`;

mongoose.connect(url, {useNewUrlParser: true});

//Routes
const routes = require("./routes/routes.js")
