const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("connected", () => {
  console.log(`Database connected on ${mongoose.connection.host}`);
});

database.on("error", (err) => {
  console.log({ error: "Database connection error", message: err.message });
});

database.on("disconnected", () => {
  console.log("Database disconnected");
});

module.exports = database;

// const mongoose = require("mongoose");
// require("dotenv").config();

// // const mongoUrl=process.env.MONGODB_LOCAL_URL;
// // const mongoUrl = 'mongodb://localhost:27017/Ecommerce';
// const mongoUrl = process.env.MONGODB_LOCAL_UR;

// mongoose.connect(mongoUrl);

// const database = mongoose.connection;

// database.on("connected", () => {
//   console.log(`database connected on ${mongoose.connection.host}`);
// });

// database.on("error", () => {
//   console.log({ error: "database Connection error" });
// });

// database.on("disconnected", () => {
//   console.log("database disconnected");
// });

// module.exports = database;
