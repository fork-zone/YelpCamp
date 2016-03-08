var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// ============================
// COMMENTS ROUTES
// ============================

//comments new

router.get("/new", isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
		// res.render("comments/new");
});

//comments create

router.post("/", isLoggedIn, function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
				} else {
					//add username and ID to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;

					console.log("New Comment's username will be: " + req.user._id);
					//save comment
					comment.save();
					console.log(comment);
					//associate comment to campground
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	//create new comment
	//connect new comment to campground
	//redirect to campground show page
})

//middleware

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else{
		res.redirect("/login");
	}
}

module.exports = router;