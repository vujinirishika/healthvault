var router = require("express").Router();
var localStorage = require('localStorage')
const Appointments = require("../../models/appointment");
const Doctors = require("../../models/doctor");
const Admin = require("../../models/admin");
const DoctorSlots = require("../../models/doctorslots");
const Issues = require("../../models/issue");

router.get("/", (req, res) => {
    if(localStorage.getItem("adminname")) {
        console.log("yes");
        res.render("Admin/adminDashboard", {usertype: "admin", username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/register", (req, res) => {
    if(localStorage.getItem("adminname")) {
        console.log("yes");
        res.render("Admin/register", {usertype: "admin", username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/appointmentslist", (req, res) => {
    if(localStorage.getItem("adminname")) {
        console.log("yes");
        Appointments.find({}, function (err, allappointments) {
            res.render("Admin/appointmentList", {appointments: allappointments, usertype: "admin", username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
            })    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/pastappointments", (req, res) => {
    if(localStorage.getItem("adminname")) {
        console.log("yes");
        var noMatch = null;
    if(req.query.search) {
        var regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Appointments.find({patientname: regex}, function(err, allappointments){
           if(err){
               console.log(err);
           } else {
              if(allappointments.length < 1) {
                  noMatch = "No results";
              }
              res.render("Admin/pastAppointments",{appointments: allappointments, noMatch: noMatch, usertype: "admin", username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
           }
        });
    } 
    else {
        Appointments.find({}, function (err, allappointments) {
            res.render("Admin/pastAppointments", {appointments: allappointments, usertype: "admin", username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
            })
    }   }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/stafflist", (req, res) => {
    var noMatch = null;
    if(req.query.search) {
        var regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Doctors.find({name: regex}, function(err, alldoctors){
           if(err){
               console.log(err);
           } else {
              if(alldoctors.length < 1) {
                  noMatch = "No results";
              }
              res.render("Admin/staffList",{doctors: alldoctors, noMatch: noMatch, usertype: "admin", username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
           }
        });
    } 
    else {
        Doctors.find({}, function (err, alldoctors) {
            res.render("Admin/staffList", {doctors: alldoctors, usertype: "admin", username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
        })
    }
})

router.post("/appslotbooking", (req, res) => {
    if(localStorage.getItem("adminname")) {
        console.log("yes");
        DoctorSlots.find({}, function (err, alldoctors) {
            res.render("Admin/bookslot", {usertype:"admin", doctors: alldoctors, username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname"), appusername: req.body.appusername, patientname: req.body.patientname, docname: req.body.docname, date: req.body.date})
        })   }
    else {
        res.render("login",{msg: ""});
    }
})

router.post("/confirmslotbooking", (req, res) => {
    const slot = ["10:00 - 10:30","10:30 - 11:00","11:00 - 11:30","1:00 - 1:30","1:30 - 2:00","2:00 - 2:30","2:30 - 3:00","3:00 - 3:30","3:30 - 4:00","4:00 - 4:30"];
    Appointments.updateMany({patientname: req.body.patientname}, {
        $set: {apptime: slot[req.body.time]},
    }).then(
        () => {
            console.log("done")
        }
        ).catch(
        (error) => {
            console.log(error)
        }
    )
    DoctorSlots.findOne({docname: req.body.docname}, function (err, docs) {
        if(err) {
            console.log(err);
        }
        else {
            if(req.body.slotdate==-1) {
                const docslot = docs.slot0;
                docslot[req.body.time]=false;
                console.log(docslot);
                DoctorSlots.updateMany({docname: req.body.docname}, {
                        $set: {slot0: docslot},
                    }).then(
                        () => {
                            console.log("done")
                        }
                        ).catch(
                        (error) => {
                            
                        }
                    );
            }
            if(req.body.slotdate==0) {
                const docslot = docs.slot1;
                docslot[req.body.time]=false;
                console.log(docslot);
                DoctorSlots.updateMany({docname: req.body.docname}, {
                        $set: {slot1: docslot},
                    }).then(
                        () => {
                            console.log("done")
                        }
                        ).catch(
                        (error) => {
                            
                        }
                    );
            }
            if(req.body.slotdate==1) {
                const docslot = docs.slot2;
                docslot[req.body.time]=false;
                console.log(docslot);
                DoctorSlots.updateMany({docname: req.body.docname}, {
                        $set: {slot2: docslot},
                    }).then(
                        () => {
                            console.log("done")
                        }
                        ).catch(
                        (error) => {
                            
                        }
                    );
            }
            if(req.body.slotdate==2) {
                const docslot = docs.slot3;
                docslot[req.body.time]=false;
                console.log(docslot);
                DoctorSlots.updateMany({docname: req.body.docname}, {
                        $set: {slot3: docslot},
                    }).then(
                        () => {
                            console.log("done")
                        }
                        ).catch(
                        (error) => {
                            
                        }
                    );
            }
            if(req.body.slotdate==3) {
                const docslot = docs.slot4;
                docslot[req.body.time]=false;
                console.log(docslot);
                DoctorSlots.updateMany({docname: req.body.docname}, {
                        $set: {slot4: docslot},
                    }).then(
                        () => {
                            console.log("done")
                        }
                        ).catch(
                        (error) => {
                            
                        }
                    );
            }
            if(req.body.slotdate==4) {
                const docslot = docs.slot5;
                docslot[req.body.time]=false;
                console.log(docslot);
                DoctorSlots.updateMany({docname: req.body.docname}, {
                        $set: {slot5: docslot},
                    }).then(
                        () => {
                            console.log("done")
                        }
                        ).catch(
                        (error) => {
                            
                        }
                    );
            }
            if(req.body.slotdate==5) {
                const docslot = docs.slot6;
                docslot[req.body.time]=false;
                console.log(docslot);
                DoctorSlots.updateMany({docname: req.body.docname}, {
                        $set: {slot6: docslot},
                    }).then(
                        () => {
                            console.log("done")
                        }
                        ).catch(
                        (error) => {
                            
                        }
                    );
            }
            if(req.body.slotdate==6) {
                const docslot = docs.slot7;
                docslot[req.body.time]=false;
                console.log(docslot);
                DoctorSlots.updateMany({docname: req.body.docname}, {
                        $set: {slot7: docslot},
                    }).then(
                        () => {
                            console.log("done")
                        }
                        ).catch(
                        (error) => {
                            
                        }
                    );
            }
        }
    })
    res.redirect("/adminDashboard");
})

router.get("/bookappointment", (req, res) => {
    if(localStorage.getItem("adminname")) {
        console.log("yes");
        Appointments.find({}, function (err, allappointments) {
            res.render("Admin/bookAppointment", {username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
        })    }
    else {
        res.render("login",{msg: ""});
    }
})

router.get("/feedback", (req, res) => {
    if(localStorage.getItem("adminname")) {
        console.log("yes");
        Issues.find({}, function (err, allissues) {
            res.render("Admin/feedback", {issues: allissues, username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
        })    }
    else {
        res.render("login",{msg: ""});
    }
})

router.post("/appointmentdetails", (req, res) => {
    console.log(req.body)
    Doctors.find({}, function (err, alldoctors) {
        res.render("Admin/patientInfo",{doctors: alldoctors, adminname: localStorage.getItem("adminname"), specialist:req.body.speciality, date: req.body.date, username: localStorage.getItem('username')});
    })
})

router.post("/viewdetails", (req, res) => {
    if(localStorage.getItem("adminname")) {
        console.log("yes");
        Appointments.findOne({patientname: req.body.name}, function(err, appointmentdetails) {
            res.render("Admin/viewDetails", {usertype:"admin", appointmentdetails: appointmentdetails, username: localStorage.getItem("username"), adminname: localStorage.getItem("adminname")});
        })
    }
    else {
        res.render("login",{msg: ""});
    }
})

router.post("/appointmentinformation", async (req, res) => {
    console.log(req.body);
    const registerAppointment = await new Appointments({
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
            res.redirect("/adminDashboard");
        }
      ).catch(
        (error) => {
          res.send(error)
        }
    );
})

router.get("/profile", (req, res) => {
    if(localStorage.getItem("adminname")) {
        console.log("yes");
        Admin.findOne({name: localStorage.getItem("adminname")}, function(err, profiledetails) {
            res.render("Admin/profile",{details: profiledetails, usertype:"admin", adminname: localStorage.getItem("adminname")});
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