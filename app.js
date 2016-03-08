var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")


    //ROUTERS
    //requiring routes
var commentRoutes 		= require("./routes/comments"),
	camgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");

	 

mongoose.connect("mongodb://tonybrackins:xxxtasy1@ds061365.mongolab.com:61365/yelp_camp");
app.use(bodyParser.urlencoded({extended:true})); //memorize this line
// Set View Engine to EJS
app.set("view engine", "ejs");
// Connect to public for styles etc
app.use(express.static(__dirname + "/public"));
console.log("Directory Name: " + __dirname);
//Seed the database
// seedDB(); 

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	 secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

//middleware that will run for every single route because of res.locals

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds",camgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);






//Listener for servers
app.listen("3001", function(){
	console.log("The YelpCamp server has started!");
});