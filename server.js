const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models/index");

var corsOptions = {
  origin: "*",
};

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced DB");
  })
  .catch((err) => {
    console.log("Failed to load DB", err.message);
  });

app.use(cors(corsOptions));
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

app.get("/", (req, res) => {
  res.json({ message: "Welcome to NodeJS Application." });
});

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
