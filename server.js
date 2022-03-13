const express = require("express");
const html = require("./routes/htmlRoutes");
const api = require("./routes/APIRoutes");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", api);

app.use("/", html);

app.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`);
});
