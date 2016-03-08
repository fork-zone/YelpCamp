var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


// ============================
// CAMPGROUNDS ROUTES
// ============================

//Campgrounds page

// Index - Show all campgrounds
router.get("/", function(req, res){
	console.log("USER" + req.user);
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log("bruhh, we got a problem");
		} else{
			console.log("Yo, we just FOUND this: ");
			console.log(allCampgrounds);
			res.render("campgrounds/index", {campgrounds: allCampgrounds, });
		}
	});
	


});
//CREATE 
router.post("/",middleware.isLoggedIn, function(req, res) {
	
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id:req.user._id,
		username: req.user.username }
	var newCampground = {name:name, image:image, description: desc, author: author}
	// campgrounds.push(newCampground);
	// create a new campground and save to database
	Campground.create(newCampground, function(err,newlycreated){
		if(err){
		console.log("yo, got an error: " + err);
		} else {
			console.log("yo, just created: " + newlycreated);
			res.redirect("/campgrounds");
		}
	});
	//redirect back to campgrounds page
	
});

// Add new campground form

//NEW

router.get("/new",middleware.isLoggedIn, function(req, res){
res.render("campgrounds/new");
});


//SHOW - shows more info about one campground
router.get("/:id", function(req, res){

	//find the camground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			//render show template witht that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
	
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err,foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});	
	});
});

//UPDATE CAMPGROUND ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			//redirect somewhere
			res.redirect("/campgrounds/" + req.params.id);
		}
	} );
	
});

// DESTROY CAMPGROUND

router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});



//middleware had been moved to middleware directory





module.exports = router;