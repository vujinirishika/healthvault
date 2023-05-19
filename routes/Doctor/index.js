var router = require("express").Router();
var localStorage = require('localStorage')
var Appointments = require('../../models/appointment')
var Doctors = require('../../models/doctor')

router.get("/", (req, res) => {
    if(localStorage.getItem("docname")) {
        console.log("yes");
        res.render("Doctor/doctorDashboard", {usertype: "doctor", username: localStorage.getItem("username"), doctname: localStorage.getItem("docname")});
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/appointments", (req, res) => {
    if(localStorage.getItem("docname")) {
        console.log("yes");
        Appointments.find({}, function (err, allappointments) {
            res.render("Doctor/appointmentsList", {appointments: allappointments, usertype: "doctor", username: localStorage.getItem("username"), doctname: localStorage.getItem('docname')});
        })    }
    else {
        res.render("login",{msg: ""});
    }
})

router.post("/viewdetails", (req, res) => {
    if(localStorage.getItem("docname")) {
        console.log("yes");
        Appointments.findOne({patientname: req.body.name}, function(err, appointmentdetails) {
            res.render("Doctor/viewDetails", {usertype:"doctor", appointmentdetails: appointmentdetails, username: localStorage.getItem("username"), doctname: localStorage.getItem("docname")});
        })
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.post("/createpres", (req, res) => {
    Appointments.find({}, function (err, allappointments) {
        res.render("Doctor/createPrescription", {appointments: allappointments, patientname: req.body.patientname, usertype: "doctor", username: localStorage.getItem("username"), doctname: localStorage.getItem('docname')})
    })
})

router.post("/submitvitals", (req, res) => {
    Appointments.findOne({patientname: req.body.patientname}, function (err, docs) {
        if(err) {
            console.log(err);
        }
        else {
            // global.slots = docs.slot2;
            console.log(docs)
            Appointments.updateMany({patientname: req.body.patientname}, {
                    $set: {bodytemp: req.body.bodytemp, pulserate: req.body.pulserate, resprate: req.body.resprate, bp: req.body.bp, status: 1},
                }).then(
                    () => {
                        console.log("done")
                        res.redirect("/doctorDashboard")
                    }
                    ).catch(
                    (error) => {
                        
                    }
                );
        }
    })
})

router.post("/submitpres", (req, res) => {
    Appointments.findOne({patientname: req.body.patientname}, function (err, docs) {
        if(err) {
            console.log(err);
        }
        else {
            // global.slots = docs.slot2;
            console.log(docs)
            Appointments.updateMany({patientname: req.body.patientname}, {
                    $set: {pres: req.body.pres, recommendations: req.body.recommendations, status: 2},
                }).then(
                    () => {
                        console.log("done")
                        res.redirect("/doctorDashboard")
                    }
                    ).catch(
                    (error) => {
                        
                    }
                );
        }
    })
})

router.get("/pastappointments", (req, res) => {
    if(localStorage.getItem("docname")) {
        console.log("yes");
        var noMatch = null;
        console.log(localStorage.getItem('docname'))
        if(req.query.search) {
            var regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Appointments.find({patientname: regex}, function(err, allappointments){
               if(err){
                   console.log(err);
               } else {
                  if(allappointments.length < 1) {
                      noMatch = "No results";
                  }
                  res.render("Doctor/pastAppointments",{appointments: allappointments, noMatch: noMatch, usertype: "Doctor", doctname: localStorage.getItem('docname'), username: localStorage.getItem("username")});
               }
            });
        } 
        else {
            Appointments.find({}, function (err, allappointments) {
                res.render("Doctor/pastAppointments", {appointments: allappointments, usertype: "Doctor", doctname: localStorage.getItem('docname'), username: localStorage.getItem("username")});
                })
        }    }
    else {
        res.render("login",{msg: ""});
    }
    
})

// router.get('/pdf', function (req, res) {
//     var filePath ="C:/Users/Venkat Ganesh/OneDrive/Desktop/Mini project/code/uploads/ganesh123-0";

//     fs.readFile(filePath , function (err,data){
//         res.contentType("application/file");
//         res.send(data);
//     });
// });

router.get("/profile", (req, res) => {
    if(localStorage.getItem("docname")) {
        console.log("yes");
        Doctors.findOne({name: localStorage.getItem("docname")}, function(err, profiledetails) {
            res.render("Doctor/profile",{details: profiledetails, usertype:"doctor", doctname: localStorage.getItem("docname")});
        })
    }
    else {
        res.render("login",{msg: ""});
    }
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}; 

module.exports = router;