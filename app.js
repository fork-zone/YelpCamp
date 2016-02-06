var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true})); //memorize this line

//database:

var campgrounds = [
		{name: "Salmon Creek", image: "http://photosforclass.com/download/7962474612"},
		{name: "Granite Hill", image: "http://photosforclass.com/download/215827008"},
		{name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/6234565071"},
		{name: "Really Cool Campg", image: "http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51"}
	]
// Set View Engine to EJS
app.set("view engine", "ejs");

//Homepage
app.get("/", function(req, res){
res.render("landing");
});

//Campgrounds page
app.get("/campgrounds", function(req, res){
	
res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res) {
	
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
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