const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
	getEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
} = require("../controllers/event.controller.js");

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
