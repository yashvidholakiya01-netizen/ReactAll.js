const router = require("express").Router();
const auth = require("../middleware/auth");
const { createQueue, joinQueue, nextUser } = require("../controllers/queueController");

router.post("/create", auth, createQueue);
router.post("/join", auth, joinQueue);
router.post("/next", auth, nextUser);

module.exports = router;