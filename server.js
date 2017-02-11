var express = require("express");
var mongojs = require("mongojs");

var cheerio = require("cheerio");
var request = require("request");

var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error){
	console.log("Database Error:", error);
});

app.get("/", function(req, res){
	res.send("Hello World!");
});

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

app.get("/all", function(req, res){
	db.scrapedData.find({}, function(error, found){
		if(error) {
			console.log(error);
		}
		else {
			res.json(found);
		}
	});
});

app.listen(3000, function(){
	console.log("App running on port 3000!");
});