const router = require("express").Router();
const fetchController = require("../../controllers/fetch.js");

router.get("/", fetchController.scrape);

module.exports = router;