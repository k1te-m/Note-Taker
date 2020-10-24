// Dependencies
var express = require("express");

// Express Server Configuration
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Set Server to Listen
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})