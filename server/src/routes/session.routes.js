const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const { createSession, updateSession, deleteSession } = require("../controllers/session.controller.js");

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, createSession);
router.put("/:id", authMiddleware, updateSession);
router.delete("/:id", authMiddleware, deleteSession);

module.exports = router;
