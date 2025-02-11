const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const dbConnect = require("./utils/db");
const authRoutes = require("./routes/userRoutes");
require("dotenv").config();
const port = process.env.PORT;

dbConnect();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
