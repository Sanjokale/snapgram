const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const dbConnect = require("./utils/db");
const UserRoute = require("./routes/users");
const postRoute = require("./routes/posts");
require("dotenv").config();
const port = process.env.PORT;
const path = require("path");
dbConnect();

app.use("/static", express.static(path.join(__dirname, "../uploads")));

app.use(express.json());
app.use(cors());
app.use(UserRoute);
app.use(postRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
