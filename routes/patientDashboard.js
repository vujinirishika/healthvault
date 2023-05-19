var router = require("express").Router();
const Doctors = require("../models/doctor");
const Appointment = require("../models/appointment");
const Issue = require("../models/issue");
const Patient = require("../models/patient");
const localStorage = require('localStorage');
// var fs = require('fs');
// var path = require('path');
// require('dotenv/config');
// var multer = require('multer');

// localStorage.setItem("counter",0);

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, localStorage.getItem("username")+'-'+localStorage.getItem("counter"))
//     }
// });
 
// var upload = multer({ storage: storage });

// router.post("/submitpdf", upload.single('pdf'), (req, res) => {
//     res.redirect("/patientDashboard/myappointments");
//     Appointment.findOne({patientname: req.body.patientname}, function (err, docs) {
//         if(err) {
//             console.log(err);
//         }
//         else {
//                 const files = docs.files;
//                 files[files.length]=localStorage.getItem("username")+'-'+localStorage.getItem("counter");
//                 Appointment.updateMany({patientname: req.body.patientname}, {
//                         $set: {files: files},
//                     }).then(
//                         () => {
//                             localStorage.setItem("counter",localStorage.getItem("counter")+1)
//                             console.log("done")
//                         }
//                         ).catch(
//                         (error) => {
                            
//                         }
//                     );
//         }
//     })
// })

// router.get("/navbar", (req, res) => {
//     res.render("header",{usertype:"patient", username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
// })

router.get("/", (req, res) =>{
    if(localStorage.getItem("fullname")) {
        console.log("yes");
        res.render("patientDashboard",{usertype:"patient", username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/aboutus", (req, res) => {
    if(localStorage.getItem("fullname")) {
        console.log("yes");
        res.render("aboutUs", {usertype:"patient", username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/bookappointment", (req, res) => {
    if(localStorage.getItem("fullname")) {
        console.log("yes");
        res.render("bookApointment", {usertype:"patient", username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/contactus", (req, res) => {
    if(localStorage.getItem("fullname")) {
        console.log("yes");
        res.render("contactUs", {usertype:"patient", username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/myappointments", (req, res) => {
    if(localStorage.getItem("fullname")) {
        console.log("yes");
        Appointment.find({}, function (err, allappointments) {
            res.render("myAppointments", {usertype:"patient", appointments: allappointments, username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
        })    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/mypastappointments", (req, res) => {
    if(localStorage.getItem("fullname")) {
        console.log("yes");
        Appointment.find({}, function (err, allappointments) {
            res.render("pastAppointments", {usertype:"patient", appointments: allappointments, username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
        })    }
    else {
        res.render("login",{msg: ""});
    }
})

router.post("/viewdetails", (req, res) => {
    if(localStorage.getItem("fullname")) {
        console.log("yes");
        Appointment.findOne({patientname: req.body.name}, function(err, appointmentdetails) {
            res.render("viewDetails", {usertype:"patient", appointmentdetails: appointmentdetails, username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
        })
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.post("/appointmentdetails", (req, res) => {
    if(localStorage.getItem("fullname")) {
        console.log("yes");
        Doctors.find({}, function (err, alldoctors) {
            res.render("patientInfo",{doctors: alldoctors, specialist:req.body.speciality, date: req.body.date, username: localStorage.getItem('username'), fullname: localStorage.getItem("fullname")});
        })    }
    else {
        res.render("login",{msg: ""});
    }
    console.log(req.body)
})

router.post("/logout", (req, res) => {
    localStorage.clear();
    console.log(localStorage.getItem("fullname"))
    res.render("index");
})

router.post("/appointmentinformation", async (req, res) => {
    console.log(req.body);
    const registerAppointment = await new Appointment({
        patientname: req.body.patientname,
        patientage: req.body.patientage,
        patientgender: req.body.gender,
        patientemail: req.body.patientemail,
        patientmobilenumber: req.body.patientmno,
        patientloc: req.body.patientloc,
        description: req.body.description,
        docname: req.body.doctorname,
        date: req.body.date,
        username: req.body.username,
        apptime: req.body.apptime,
        bodytemp: "",
        pulserate:"",
        resprate:"",
        bp: "",
        pres: req.body.pres,
        recommendations: "",
        status: req.body.status,
    });
    registerAppointment.save().then(
        () => {
            res.render("patientDashboard",{usertype:"patient", username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
        }
      ).catch(
        (error) => {
          res.send(error)
        }
    );
})

router.post("/submitissue", async (req, res) => {
    console.log(req.body);
    const submitissue = await new Issue({
        name: req.body.name,
        mobilenumber: req.body.telnum,
        email: req.body.emailid,
        des: req.body.desc,
    });
    submitissue.save().then(
        () => {
            res.render("patientDashboard",{usertype:"patient", username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
        }
      ).catch(
        (error) => {
          res.send(error)
        }
    );
})

router.get("/profile", (req, res) => {
    if(localStorage.getItem("fullname")) {
        console.log("yes");
        Patient.findOne({name: localStorage.getItem("fullname")}, function(err, profiledetails) {
            res.render("profile",{details: profiledetails, usertype:"patient", fullname: localStorage.getItem("fullname")});
        })
    }
    else {
        res.render("login",{msg: ""});
    }
})

module.exports = router;