//Dependencies
//============================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var logger = require("morgan");
// var cheerio = require("cheerio"); //required in article-api-routes.js
// var request = require("request"); //required in article-api-routes.js

var Promise = require("bluebird");
mongoose.Promise = Promise;


//Assign PORT
//============================================
var PORT = 3000;
var app = express();


//Set up Express App to handle data parsing
//============================================
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));


// Set Handlebars as the default templating engine.
//============================================
app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Static Directory
//============================================
app.use(express.static(process.cwd() + "/public"));


// Set up Mongoose and connect to Mongodb
//============================================
mongoose.connect("mongodb://localhost/scraper");
var db = mongoose.connection;

db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

db.once("open", function() {
	console.log("Mongoose connection successful.");
});


//Routes
//============================================
require("./controllers/article-api-routes.js")(app);
require("./controllers/comment-api-routes.js")(app);
require("./controllers/user-api-routes.js")(app);


//Listener
//============================================
app.listen(PORT, function() {
	console.log("App running on port", PORT);
});