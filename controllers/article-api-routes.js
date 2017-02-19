//Dependencies
//============================================
var cheerio = require("cheerio");
var request = require("request");
var Article = require("../models/Article.js");


module.exports = function(app) {
	// Set up scraper with Cheerio and get scraped articles
	//============================================
	app.get("/", function(req, res) {
		request("https://www.reddit.com/r/worldnews", function(error, response, html) {
			var $ = cheerio.load(html);

			$("p.title").each(function(i, element) {
				var result = {};

				result.title = $(element).children().text();
				result.link = $(element).children().attr("href");
				result.picture;

				var entry = new Article(result);

				entry.save(function(err, doc) {
					if(err) {
						console.log(err);
					} else {
						console.log("Success ", doc);
					}
				});
			});
		});
		res.render("landing");
	});

	//Get Scraped Articles from DB
	app.get("/scrape", function(req, res) {
		Article.find({}, function(error, doc) {
			if(error) {
				console.log(error);
			} else {	
				res.render("landing", {result: doc});			}
		});
	});

	app.get("/newsreel", function(req, res) {
		Article.find({}, function(error, doc) {
			if(error) {
				console.log(error);
			} else {	
				res.render("newsreel", {result: doc});			}
		});
	});


	// Save Scraped Articles (post)
	// app.post("/submit", function(req, res) {
	// 	User.find({}, {$push:{"_id": req.params.id}}, {new: true}, function(err, doc){

	// 	});
	// 	.populate("")
	// });4

	//Get Saved Articles
	app.get("/newsreel", function(req, res) {
		User.findOneAndUpdate({}, function(error, doc) {
			if(error) {
				console.log(error);
			} else {
				// res.render("landing");
				res.json(doc);
			}
		});
	});
	//Delete Saved Articles
	app.delete("/newsreel/:id", function(req, res) {
		User.findByIdAndRemove(req.params.id, {
			"savedArticles": doc._id
		});
	});
};