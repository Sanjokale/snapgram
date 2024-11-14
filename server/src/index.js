const express = require("express");
const cors = require('cors');
const app = express();
const port = 8000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/snapgram");

app.use(express.json())
app.use(cors())

const { Schema } = mongoose;
// email, phoneNumber, password, role, fullName, fatherName, motherName)
const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
// User.create({
//   fullName: "Sanjok Alemagar",
//   email: "sanjok@gmail.com",
//   password: "1223445",
// });

app.post("/register", (req, res) => {
  User.create(req.body);
  res.send("User created!");

});

app.get("/users", (req, res) => {
  res.send(["ram", "shyam", "hari"]);
});

app.get("/products", (req, res) => {
  res.send(["hawkins", "baltra"]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
