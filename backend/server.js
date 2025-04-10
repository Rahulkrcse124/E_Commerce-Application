const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/.env" });
}

const app = require("./app");
const cloudinary = require("cloudinary");
const database = require("./config/database");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to an uncaught exception");
  process.exit(1);
});

app.get("/", (req, res) => {
  res.send("E-Commerce project");
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to an unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
