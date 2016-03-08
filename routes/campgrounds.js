var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


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
router.post("/", function(req, res) {
	
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description: desc}
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

router.get("/new", function(req, res){
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

module.exports = router;