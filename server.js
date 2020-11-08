const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "../.env" });

mongoose.connect(
  `mongodb+srv://thatbawss:${process.env.MONGO_PASSWORD}@cluster0.kqhf8.mongodb.net/goodlife?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const userDataSchema = new mongoose.Schema({
  email: String,
  password: String,
  time: Number,
});

const userData = mongoose.model("UserData", userDataSchema);

app.post("/", (req, res) => {
  userData.create(
    {
      email: req.body.email,
      password: req.body.password,
      time: req.body.time,
    },
    (err, newUserData) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(newUserData);
    }
  );
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // listens on this port
