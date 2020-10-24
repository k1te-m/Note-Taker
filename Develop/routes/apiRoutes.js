var path = require("path");
var fs = require("fs");

module.exports = function (app) {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (
    error,
    data
  ) {
    if (error) throw error;
    const notes = JSON.parse(data);
   
    app.get("/api/notes", function(req, res) {
      res.json(notes);
    })

    app.post("/api/notes", function (req, res) {
      const noteAdded = req.body;
      const noteID = notes.length + 1;
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

    // app.delete("/api/notes/:id", function(req, res) {
    //   let noteID = req.params.id;

    //   const newNotes = notes.filter(note => note.id != noteID);
    //   fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes, null, 2), function(error) {
    //     if (error) throw error;
    //     console.log("Note deleted...");
    //     res.end()
    //   })
    // })

    
  });
};
