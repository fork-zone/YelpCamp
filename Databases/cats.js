var mongoose = require("mongoose");
mongoose.connect('mongodb://tonybrackins:xxxtasy1@ds059375.mongolab.com:59375/cat_ap');

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperment: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

// var george = new Cat({
// 	name: "George",
// 	age: 11,
// 	temperment: "Grouchy"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("Error: Something went wrong");
// 	} else {
// 		console.log("We just saved a cat to the DB: ");
// 		console.log(cat);
// 	}
// });
//create without "new and save";
Cat.create({
	name:"Snow White",
	age: 15,
	temperment: "bland"
}, function(err, thecat){
	if(err){
		Console.log("error");
	} else {
		console.log("We just added: ");
		console.log(thecat);
	}
});
//retrieve all cats from the DB and console.log each one

// Cat.find({}, function(err, cats){
// 	if(err){
// 		console.log("oh no, error!");
// 	} else {
// 		console.log("All the cats....");
// 		console.log(cats);
// 	}
// });