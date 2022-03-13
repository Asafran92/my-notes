const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
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
}

module.exports = new Store();
