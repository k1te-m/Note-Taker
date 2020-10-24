// Dependencies
var express = require("express");

// Express Server Configuration
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Routes

require("./routes/htmlRoutes")(app);

// Set Server to Listen
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})