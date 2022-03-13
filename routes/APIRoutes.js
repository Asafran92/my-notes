const router = require("express").Router();
const store = require("../db/store");

router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((result) => {
      // console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
