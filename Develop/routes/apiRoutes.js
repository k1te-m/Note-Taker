var path = require("path");
var fs = require("fs");

module.exports = function (app) {
  // Readfile to establish notes variable for all api routes
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (
    error,
    data
  ) {
    if (error) throw error;
    const notes = JSON.parse(data);
    // Linked to the getNotes ajax function call in index.js, reads the currently saved notes objects in the notes array for display on the notes.html page
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });
    // Post method for the creation of a new note, newNote object is created with an ID equal to it's future index position and title and text are assigned from req.body. newNote is then pushe dinto the notes array and the db.json file is rewritten with the new information
    app.post("/api/notes", function (req, res) {
      const noteAdded = req.body;
      const noteID = notes.length;
      const newNote = {
        id: noteID,
        title: noteAdded.title,
        text: noteAdded.text,
      };
      notes.push(newNote);
      console.log(notes);
      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notes, null, 2),
        function (error) {
          if (error) throw error;
          res.redirect("/notes");
          console.log("Note created...");
        }
      );
    });
    // Delete method tied to the deleteNote ajax function call in index.js. Utilizes the splice method to remove note from the array based on the req.params.id which is tied to the index position of the note within the notes array. Since noteID and the index position are equivalent the correct note will be removed. The one indicates we only want to remove one item from the array.
    app.delete("/api/notes/:id", function (req, res) {
      let noteID = req.params.id;

      notes.splice(noteID, 1);

      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notes, null, 2),
        function (error) {
          if (error) throw error;
          console.log("Note deleted...");
          res.end();
        }
      );
    });
  });
};
