var router = require("express").Router();
var localStorage = require('localStorage')

router.get("/", (req, res) => {
    res.render("register", {username: localStorage.getItem("username")})
})

  
module.exports = router;