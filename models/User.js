var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	name: {
		type: String,
		unique: true
	}, 
	password: {
	    type: String,
	    trim: true,
	    required: "Password is Required",
	    validate: [
			function(input) {
				return input.length >= 6;
			},
			"Password should be longer."
	    ]
	},
	userCreated: {
	    type: Date,
	    default: Date.now
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}],
	savedArticles: [{
		type: Schema.Types.ObjectId,
		ref: "Article"
	}]
});

var User = mongoose.model("User", UserSchema);
module.exports = User;