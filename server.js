// // Requiring necessary npm packages
// var express = require("express");
// var session = require("express-session");
// // Requiring passport as we've configured it
// var passport = require("./config/passport");

// // Setting up port and requiring models for syncing
// var PORT = process.env.PORT || 8080;
// var db = require("./models");

// // Creating express app and configuring middleware needed for authentication
// var app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));
// // We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// // Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(function() {
//   app.listen(PORT, function() {
//     console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
//   });
// });
//==================================================everything above this line from brew IQ ===================================================



var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/testyMcTestFace", { useNewUrlParser: true });

// Routes=====================================================  Routes =======================================================================

// ======================================================== from brew Iq  ===========================================

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// require("./routes/beer-apiRoutes")(app);
// require("./routes/stage1apiRoutes")(app);
// require("./routes/stage2apiRoutes")(app);
// require("./routes/stage3apiRoutes")(app);
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);
// ===========================================================================================================================

// app.get("/", function(req, res) {

//     res.render("index");

// });



// A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with axios
//   axios.get("http://www.echojs.com/").then(function(response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     // Now, we grab every h2 within an article tag, and do the following:
//     $("article h2").each(function(i, element) {
//       // Save an empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.title = $(this)
//         .children("a")
//         .text();
//       result.link = $(this)
//         .children("a")
//         .attr("href");

//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//         .then(function(dbArticle) {
//           // View the added result in the console
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, log it
//           console.log(err);
//         });
//     });

//     // Send a message to the client
//     res.send("Scrape Complete");
//   });
// });

// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//   // Grab every document in the Articles collection
//   db.Article.find({})
//     .then(function(dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   db.Article.findOne({ _id: req.params.id })
//     // ..and populate all of the notes associated with it
//     .populate("note")
//     .then(function(dbArticle) {
//       // If we were able to successfully find an Article with the given id, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   db.Note.create(req.body)
//     .then(function(dbNote) {
//       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     })
//     .then(function(dbArticle) {
//       // If we were able to successfully update an Article, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// Start the server ========================================================== server listening =====================================
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});