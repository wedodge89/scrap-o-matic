const router = require("express").Router();
const clearController = require("../../controllers/clear.js");

router.get("/", clearController.clearDB);

module.exports = router;