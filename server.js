const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var storedNotes = require("./db/db.json");
const { Server } = require("http");
const { prototype } = require("events");

const app = express();
// PORT variable with the node env variable
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using the static files from the public folder
app.use(express.static("public"));

// GET route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET route for /notes URL
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET request for grabbing stored notes
app.get("/api/notes", (req, res) => {
  res.json(storedNotes);
});

// POST request to add new note
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a new note.`);
  // destructured note object as a variable
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      // using the identifier function within the newNote object
      id: uuidv4(),
    };

    // pushing to newNote Array
    storedNotes.push(newNote);

    fs.writeFile(`./db/db.json`, JSON.stringify(storedNotes, null, 2), (err) =>
      err
        ? console.error(err)
        : console.log(`"${newNote.title}" has been added to JSON file`)
    );

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in writing note");
  }
});

// DELETE request to delete note
app.delete("/api/notes/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note.`);

  const id = req.params.id;
  if (id) {
    storedNotes = storedNotes.filter((item) => item.id !== id);

    fs.writeFile(`./db/db.json`, JSON.stringify(storedNotes, null, 2), (err) =>
      err
        ? console.error(err)
        : console.log(`Note with id ${id} has been deleted from JSON file`)
    );

    const response = {
      status: "success",
      id: id,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in deleting note");
  }
});

// GET route for homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Listen to PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);

// troubleshooting heroku
// Server.listen(PORT,()=>{
//     console.log(`app is running on  ${PORT}`);
// })
