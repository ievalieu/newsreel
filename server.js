//Dependencies
//============================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var mongooes = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

//Assign PORT
//============================================
var PORT = 3000;
var app = express();

//Set up Express App to handle data parsing
//============================================
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

// Set up MongoDB
//============================================
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error){
	console.log("Database Error:", error);
});

// app.get("/", function(req, res){
// 	res.send("Hello World!");
// });

// Set up scraper with Cheerio
//============================================
request("https://www.reddit.com/r/worldnews", function(error, response, html){
	var $ = cheerio.load(html);

	$("p.title").each(function(i, element){

		var title = $(element).children().text();
		var link = $(element).children().attr("href");

		db.scrapedData.insert({
			title: title,
			link: link
		});
		console.log(title);
	});
	console.log(db.scrapedData);
});

app.get("/", function(req, res){
	db.scrapedData.find({}, function(error, found){
		if(error) {
			console.log(error);
		}
		else {
			res.render("landing");
		}
	});
});

//Listener
//============================================
app.listen(PORT, function(){
	console.log("App running on port", PORT);
});