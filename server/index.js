require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Book = require("./models/Books");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/books", async (req, res) => {
  try {
    const data = await Book.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

app.get("/", (req, res) => {
  res.json("Hello mate!");
});

app.get("*", (req, res) => {
  res.json("404 mate!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
