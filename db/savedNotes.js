// required dependencies
const fs = require("fs");
const util = require("util"); //use as a helper to format string data
const { v1 } = require("uuid"); // universal identifier to differentiate between saved notes

// create read and write file for route paths

const readNote = util.promisify(fs.readFile); 
// these two variables utilize the util helper to create an asynch function that provides a promise returned instead of a callback
const writeNote = util.promisify(fs.writeFile); 
// * "Keep Going, Meet the Universe Half Way" 
class savedNotes {
  read() { //read notes method
    return readNote("db/db.json", "utf-8");
  }

  write(note) { //write  notes method
    return writeNote("db/db.json", "utf-8");
  }

  getNotes() { //get notes method
    return this.read().then((notes) => {
      let seeNotes;
//if no notes are found respond with empty array
      try {
        seeNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        seeNotes = [];
      }
      return seeNotes;
    });
  }

  createNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Please Enter Title and Text");
    }
    const newNote = { title, text, id: v1() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  };

  deleteNote(id){
      return this.getNotes()
      .then((notes)=>notes.filter((note)=>note.id !==id)).then((filteredNotes)=> this.write(filteredNotes));
  };
};


module.exports = new savedNotes();