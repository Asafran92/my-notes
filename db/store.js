const fs = require("fs");
const util = require("util");
const router = require("../routes/APIRoutes");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");
class Store {
  getNotes() {
    return readFileAsync("db/db.json", "utf-8").then((result) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(result));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    let noteWithId = { id: uuidv4(), title: note.title, text: note.text };
    return this.getNotes()
      .then((notes) => [...notes, noteWithId])
      .then((updatedNotes) =>
        writeFileAsync("db/db.json", JSON.stringify(updatedNotes))
      )
      .then(() => noteWithId);
  }
  removeNote(id) {
    return this.getNotes()
      .then((notes) => {
        return notes.filter((note) => note.id !== id);
      })
      .then((filteredNotes) => {
        writeFileAsync("db/db.json", JSON.stringify(filteredNotes));
      });
  }
}

module.exports = new Store();
