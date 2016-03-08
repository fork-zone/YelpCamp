var mongoose 	= require("mongoose");
var	Campground  = require("./models/campground.js");
var Comment = require("./models/comment.js");

var data = [
		{
			name: "Cloud's Rest",
			image: "http://www.newlondontourism.com/images/camping-WRTC-beach.jpg",
			description: "Bacon ipsum dolor amet kevin brisket porchetta beef ball tip cow pork belly prosciutto pork loin andouille chuck turkey. Filet mignon kevin prosciutto landjaeger capicola boudin pork belly ground round spare ribs fatback salami chuck cupim t-bone. Strip steak pork loin shank landjaeger rump jerky corned beef turducken ham hock capicola brisket beef. Short ribs kevin porchetta pastrami cow. Landjaeger chicken tail cow jerky shankle."
		},

		{
			name: "Water Front",
			image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5084234.jpg",
			description: "Ground round short ribs cupim venison picanha sausage meatloaf pastrami shoulder beef. Pastrami cupim ham sirloin shoulder short ribs short loin picanha tail frankfurter jowl. Leberkas brisket swine doner tongue, beef ribs sausage ham tail ball tip turducken kielbasa ribeye sirloin ground round. Tenderloin capicola flank leberkas cow ribeye, salami landjaeger kielbasa. Chuck biltong ham hock pancetta. Cupim porchetta kielbasa tenderloin doner venison, pancetta jowl filet mignon brisket."
		},

		{
			name: "Back Woods",
			image: "http://www.big-sur-lodging.com/Big-Sur-California-Visitor-Guide/Outdoor-Activities/Photos_Camping_Campgrounds/Ponderosa_Campground_Campsite-02LG.jpg",
			description: "Pork belly frankfurter drumstick short ribs t-bone short loin alcatra tenderloin cupim turducken ham porchetta ground round capicola swine. Meatball sausage meatloaf leberkas. Jowl brisket drumstick shankle chuck cupim. Pastrami ham hock jowl filet mignon, drumstick alcatra pork chop boudin landjaeger. Filet mignon chuck beef ribs kielbasa, boudin short loin strip steak shank short ribs corned beef tri-tip tail."
		}


];





function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else{
		console.log("removed campground");

		//add a few campgrounds
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err){
				console.log(err);
			} else {
				console.log("added a campground");
				//create a comment
				Comment.create(
					{text: "This place is great, but I wish there was internet",
					 author: "Homer"
						}, function(err, comment){
							if (err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("created new comment");
							}
						})
			}
		});
	});
	}
	}); 

	

}

module.exports = seedDB;

