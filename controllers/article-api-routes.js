//Dependencies
//============================================
var cheerio = require("cheerio");
var request = require("request");
var Article = require("../models/Article.js");


module.exports = function(app) {
	// Set up scraper with Cheerio
	//============================================
	app.get("/scrape", function(req, res){
		request("https://www.reddit.com/r/worldnews", function(error, response, html){
			var $ = cheerio.load(html);

			$("p.title").each(function(i, element){
				var result = {};

				result.title = $(element).children().text();
				result.link = $(element).children().attr("href");
				result.picture;

				var entry = new Article(result);

				entry.save(function(err, doc){
					if(err){
						console.log(err);
					} else {
						console.log(doc);
					}
				});
			});
		});
		res.send("Scrape Complete");
	});

	//Get Scraped Articles
	app.get("/articles", function(req, res){
		Article.find({}, function(error, found){
			if(error) {
				console.log(error);
			}
			else {
				// res.render("landing");
				res.json(found);
			}
		});
	});

	//Save Scraped Articles (post)

	//Get Saved Articles

	//Delete Saved Articles

};
