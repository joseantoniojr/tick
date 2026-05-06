const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const { buyTicket, getMyTickets } = require("../controllers/ticket.controller.js");

const router = Router();

router.post("/buy", authMiddleware, buyTicket);
router.get("/my", authMiddleware, getMyTickets);

module.exports = router;
