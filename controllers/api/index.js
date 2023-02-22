const router = require("express").Router();
const apiRoutes = require("./api");
const postRoutes = require("./api/post-routes");

router.use("/post", postRoutes);
router.use("/api", apiRoutes);

module.exports = router;
