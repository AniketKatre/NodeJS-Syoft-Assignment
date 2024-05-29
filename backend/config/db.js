const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log(`Mongoose connected`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
