var express = require("express");
var router = express.Router();
var path = require("path");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.sendFile("register_form.html", {
    root: path.join(__dirname, "../public")
  });
});

module.exports = router;
