var Campground = require('../models/campground');
var Comment = require('../models/comment');


// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
//is user logged in?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err,foundCampground){
		if(err){
			req.flash("error", "Yo, Campground not found dude..");
			res.redirect('back');
		} else {
			//does user own the campground? 
			if(foundCampground.author.id.equals(req.user._id)){
				next();
			} else {
				req.flash("error", "Yo, you don't have permission to do that!");
				res.redirect("back");
			}
			
		}
	});
	}else {
		console.log("you need to be logged in to do that");
		req.flash("error", "Yo, you don't have permissions for that..");
		res.redirect("back");
	}
		
			//otherwise, redirect
	
	//if not, redirect
}


middlewareObj.checkCommentOwnership = function(req, res, next){
//is user logged in?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,foundComment){
			console.log("comment author id " + foundComment.author.id);
			console.log("req.userid " + req.user._id);
		if(err){
			res.redirect('back');
		} else {
			//does user own the comment? 
			if(foundComment.author.id.equals(req.user._id)){
				next();
			} else {
				req.flash("error", "Yo, you don't have permssion to do that...");
				res.redirect("back");
			}
			
		}
	});
	}else {
		res.redirect("back");
	}
		
			//otherwise, redirect
	
	//if not, redirect
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else{
		req.flash("error", "Yo, You need to be logged in to do that...");
		res.redirect("/login");
	}
}



module.exports = middlewareObj;