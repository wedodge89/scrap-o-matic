const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const viewRoutes = require("./view");

router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;