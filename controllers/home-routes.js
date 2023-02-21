const router = require("express").Router();
//const Dish = require('../models/Dish');

// route to get all dishes
router.get("/", async (req, res) => {
  console.log("inside home-routes.js");
  res.render("all");
});

module.exports = router;
