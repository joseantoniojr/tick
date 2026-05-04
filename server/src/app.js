const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes.js");

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);

module.exports = app;
