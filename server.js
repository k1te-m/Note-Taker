// Dependencies
const express = require("express");

// Express Server Configuration
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Set Server to Listen
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
