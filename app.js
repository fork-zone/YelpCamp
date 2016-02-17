var express		= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose")  

mongoose.connect("mongodb://tonybrackins:xxxtasy1@ds061365.mongolab.com:61365/yelp_camp");

// var MongoClient = require('mongodb').MongoClient;  for Mongo DB
// var assert = require('assert');




app.use(bodyParser.urlencoded({extended:true})); //memorize this line

// Set View Engine to EJS
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});
//SCHEMA SETUP
	// Model Setup
var Campground = mongoose.model("Campground", campgroundSchema);;

// Campground.create(
// 	{
// 		name: "Granite Hill", 
// 		image: "http://photosforclass.com/download/215827008"

// 	}, function(err, camp){
// 		if(err) {
// 			console.log("we caught an error");
// 		} else {
// 			console.log("we just created");
// 			console.log(camp);
// 		}
// 	});

//database:
//Mongo

// var url = 'mongodb://tonybrackins:xxxtasy1@ds060478.mongolab.com:60478/tonymongo';
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to Mongo server.");
//   db.close();
// });


//Mongoose
// var uri = 'mongodb://tonybrackins:xxxtasy1@ds060478.mongolab.com:60478/tonymongo';
// global.db = mongoose.createConnection(uri);
// var campgrounds = [
// 		{name: "Salmon Creek", image: "http://photosforclass.com/download/7962474612"},
// 		{name: "Granite Hill", image: "http://photosforclass.com/download/215827008"},
// 		{name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/6234565071"},
// 		{name: "Really Cool Campg", image: "http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51"}
// 	]


//Homepage
app.get("/", function(req, res){
res.render("landing");
});

//Campgrounds page
app.get("/campgrounds", function(req, res){
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log("bruhh, we got a problem");
		} else{
			console.log("Yo, we just FOUND this: ");
			console.log(allCampgrounds);
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
	


});

app.post("/campgrounds", function(req, res) {
	
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image};
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

app.get("/campgrounds/new", function(req, res){
res.render("new");
});

//messing with OOP
// var campground = function(campname, image) {
// 	this.campname = campname;
// 	this.campimage = campimage;
// }




//Listener for servers
app.listen("3000", function(){
	console.log("The YelpCamp server has started!");
});