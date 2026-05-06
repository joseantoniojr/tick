const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes.js");
const eventRoutes = require("./routes/event.routes.js");
const sessionRoutes = require("./routes/session.routes.js");
const sectorRoutes = require("./routes/sector.routes.js");
const ticketRoutes = require("./routes/ticket.routes.js");

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/events/:eventId/sessions", sessionRoutes);
app.use("/events/:eventId/sessions/:sessionId/sectors", sectorRoutes);
app.use("/tickets", ticketRoutes);

module.exports = app;
