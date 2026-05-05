const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes.js");
const eventRoutes = require("./routes/event.routes.js");
const sessionRoutes = require("./routes/session.routes.js");

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/events/:eventId/sessions", sessionRoutes);

module.exports = app;
