const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(
      "mongodb://127.0.0.1:27017/snapgram"
    );
    if (isConnected) console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
