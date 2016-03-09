var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// ============================
// COMMENTS ROUTES
// ============================

//comments new

router.get("/new", middleware.isLoggedIn, function(req, res){
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

router.post("/", middleware.isLoggedIn, function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					req.flash("error", "Yo, something went wrong...");
					console.log(err);
				} else {
					//add username and ID to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;

					console.log("New Comment's username will be: " + req.user._id);
					//save comment
					comment.save();
					console.log(comment);
					req.flash("success", "Yo, Comment added!");
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

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership,  function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	})
	
	
});

//COMMENT UPDATE

router.put("/:comment_id",middleware.checkCommentOwnership,  function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// COMMENTS DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
	//findbyidand remove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Yo, comment is gone...");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})

//middleware has been moved to middleware directory



module.exports = router;