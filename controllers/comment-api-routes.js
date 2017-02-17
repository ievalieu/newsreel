//Dependencies
//============================================
var Comment = require("../models/Comment.js");

module.exports = function(app) {
	//get comments
	app.get("/newsreel/:id", function(req, res) {
		Article.find({"_id": req.params.id,})
		.populate("comment")
		.exec(function(err, doc) {
			if(err) {
				res.send(err);
			} else {
				res.json(doc);
			}
		});
	});

	//post comments
	app.post("/newsreel/:id", function(req, res) {
		Comment.save(function(err, doc) {
			if(err) {
				console.log(err);
			} else {
				res.json(doc);
			}
		});

		//update article's comment property with _id of new comment
		Article.findByIdAndUpdate(req.params.id, {
			"comment" : doc._id
		});

	});

	//delete comments
	// app.delete("/newsreel/:id", function(req, res) {
	// 	Comment.findByIdAndRemove("_id": req.params.id, function(err, ){

	// 	}

	// 	})
	// });
	//update comments
	// app.put("/newsreel/:id", function(req, res) {

	// });
};
