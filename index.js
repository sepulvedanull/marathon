import fs from "fs";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/:year/:race", (req, res) => {
  var dataPath = `./data-scraper/data/${req.params.year}/${
    req.params.race
  }.json`;

  if (!fs.existsSync(dataPath)) {
    res.status(422).send("Data file does not exist");
  } else {
    var data = require(dataPath);
    res.status(200).send(data);
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
