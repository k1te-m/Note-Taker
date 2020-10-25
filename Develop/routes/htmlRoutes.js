var path = require("path");

// Routes for the notes and home pages, server serves up notes or index html file utilizing path based on URL
module.exports = function (app) {
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
