const router = require("express").Router();
const fetchRoutes = require("./fetch.js");
const noteRoutes = require("./notes.js");
const articleRoutes = require("./articles.js");
const clearRoutes = require("./clear.js")

router.use("/fetch", fetchRoutes);
router.use("/notes", noteRoutes);
router.use("/articles", articleRoutes);
router.use("/clear", clearRoutes);

module.exports = router;