// Express app setup and middleware

require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connectDB = require("./db");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

connectDB();



app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = app;
