var router = require("express").Router();
const User = require("../models/user");
const Patient = require("../models/patient");
var localStorage = require('localStorage');
fs = require('fs');

// Patient Routes
router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.use("/patientDashboard", require("./patientDashboard"));
router.use("/registeruser", require("./registeruser"));

// Admin Routes
router.use("/adminDashboard", require("./Admin"));

// Doctor Routes
router.use("/doctorDashboard", require("./Doctor"));

router.get("/", (req, res) => {
    res.render("index")
})


module.exports = router;