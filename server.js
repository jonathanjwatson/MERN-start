require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = require("./models");

const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("Mongoose connected successfully");
});
connection.on("error", (err) => {
  console.log("Mongoose default connection error: ", err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
    currentPort: PORT,
  });
});

app.get("/api/user", (req, res) => {
  db.User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({
        error: true,
        message: "No users found",
      });
    });
});

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Express App is running on http://localhost:${PORT}`);
});
