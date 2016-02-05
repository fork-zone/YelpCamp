var express = require("express");
var app = express();

// Set View Engine to EJS
app.set("view engine", "ejs");

//Homepage
app.get("/", function(req, res){
res.render("landing");
});

//Campgrounds page
app.get("/campgrounds", function(req, res){
	var campgrounds = [
		{name: "Salmon Creek", image: "http://photosforclass.com/download/7962474612"},
		{name: "Granite Hill", image: "http://photosforclass.com/download/215827008"},
		{name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/6234565071"},
		{name: "Really Cool Campg", image: "http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51"}
	]
res.render("campgrounds", {campgrounds:campgrounds});
});

//messing with OOP
// var campground = function(campname, image) {
// 	this.campname = campname;
// 	this.campimage = campimage;
// }




//Listener for server
app.listen("3000", function(){
	console.log("The YelpCamp server has started!");
});