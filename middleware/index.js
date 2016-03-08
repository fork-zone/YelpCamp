// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
//is user logged in?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err,foundCampground){
		if(err){
			res.redirect('back');
		} else {
			//does user own the campground? 
			if(foundCampground.author.id.equals(req.user._id)){
				next();
			} else {
				res.redirect("back");
			}
			
		}
	});
	}else {
		console.log("you need to be logged in to do that");
		res.send("you need to be logged in to do that");
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
		res.redirect("/login");
	}
}



module.exports = middlewareObj;