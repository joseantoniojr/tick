const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const { createSector, updateSector, deleteSector } = require("../controllers/sector.controller.js");

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, createSector);
router.put("/:id", authMiddleware, updateSector);
router.delete("/:id", authMiddleware, deleteSector);

module.exports = router;
