var router = require("express").Router();
const User = require("../models/user");
const Patient = require("../models/patient");
const Admin = require("../models/admin");
const Doctor = require("../models/doctor");
const Slots = require("../models/doctorslots");
const bcrypt = require("bcryptjs");
var localStorage = require('localStorage')

router.post("/", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const s_pass = await bcrypt.hash(req.body.password, salt);
    console.log(s_pass);
    const registerUser = await new User({
      username: req.body.username,
      password:s_pass,
      usertype: "patient",
      name: req.body.name,
  });
  registerUser.save();
    const registerPatient = await new Patient({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        mobilenumber: req.body.mobilenumber,
        username: req.body.username,
        dob: req.body.dob,
        gender: req.body.gender,
    });
    registerPatient.save().then(
        () => {
            res.redirect("/");
        }
      ).catch(
        (error) => {
          res.send(error)
        }
    );
  });

  router.post("/registeradmin", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const a_pass = await bcrypt.hash(req.body.password, salt);
    console.log(req.body);
    const registerUser = await new User({
      username: req.body.username,
      password:a_pass,
      usertype: "admin",
      name: req.body.name,
  });
  registerUser.save();
    const registerAdmin = await new Admin({
        name: req.body.name,
        email: req.body.email,
        mobilenumber: req.body.mobilenumber,
        username: req.body.username,
        gender: req.body.gender,
        dob: req.body.dob,
        age: req.body.age,
    });
    registerAdmin.save().then(
        () => {
            res.redirect("/adminDashboard");
        }
      ).catch(
        (error) => {
          res.send(error)
        }
    );
  });

  router.post("/registerdoctor", async (req, res) => {
    const date_ob = await new Date();
    let date = ((date_ob.getDate()+1));
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const tdate = year + "-" + month + "-" + date;
    const salt = await bcrypt.genSalt(10);
    const d_pass = await bcrypt.hash(req.body.password, salt);
    console.log(req.body);
    const registerUser = await new User({
      username: req.body.username,
      password:d_pass,
      usertype: "doctor",
      name: req.body.name,
  });
  registerUser.save();
    const registerDoctor = await new Doctor({
        name: req.body.name,
        specialist: req.body.specialist,
        email: req.body.email,
        mobilenumber: req.body.mobilenumber,
        username: req.body.username,
        dob: req.body.dob,
        gender: req.body.gende,
    });
    registerDoctor.save().then(
        () => {
            res.redirect("/adminDashboard");
        }
      ).catch(
        (error) => {
          res.send(error)
        }
    );
    const saveSlots = await new Slots({
      docname: req.body.name,
      username: req.body.username,
      slot0: [true,true,true,true,true,true,true,true,true,true],
      slot1: [true,true,true,true,true,true,true,true,true,true],
      slot2: [true,true,true,true,true,true,true,true,true,true],
      slot3: [true,true,true,true,true,true,true,true,true,true],
      slot4: [true,true,true,true,true,true,true,true,true,true],
      slot5: [true,true,true,true,true,true,true,true,true,true],
      slot6: [true,true,true,true,true,true,true,true,true,true],
      slot7: [true,true,true,true,true,true,true,true,true,true],
      date: date,
      month: month,
      year: year
    });
    saveSlots.save();
  });

  module.exports = router;