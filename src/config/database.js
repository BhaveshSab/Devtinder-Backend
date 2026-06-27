require("dotenv").config();
const mongoose = require("mongoose");

// code to connect to mongoDB atlas
const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/devTinder");
    console.log(
      "Database connected"
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
