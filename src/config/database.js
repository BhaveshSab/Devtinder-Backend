
const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["1.1.1.1" , "8.8.8.8"]);

// code to connect to mongoDB atlas
const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://bhaveshcool2005_db_user:f7PjqPo9FQOQ0D5y@cluster0.i30bks9.mongodb.net/"
);
    console.log(
      "Database connected"
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
