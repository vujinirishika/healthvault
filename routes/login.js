var router = require("express").Router();
const User = require("../models/user");
const Patient = require("../models/patient");
const Doctors = require("../models/doctor");
const Admins = require("../models/admin");
const Slots = require("../models/doctorslots");
const bcrypt = require("bcryptjs");
var localStorage = require('localStorage')
// const LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');

router.get("/", (req, res) => {
    res.render("login",{msg: ""});
})

router.post("/", async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({username: req.body.username});
    if(user.usertype === "patient") {
        const validUser = await bcrypt.compare(req.body.password, user.password)
        if(validUser) {
            localStorage.setItem("user-type",user.usertype);
            localStorage.setItem("username",user.username);
            let paname = "";
            Patient.findOne({username: user.username}, function(err, docs) {
                    paname = docs.name;
                    localStorage.setItem('fullname',docs.name);
            })
            // res.render("patientDashboard",{usertype:"patient", username: localStorage.getItem("username"), fullname: localStorage.getItem("fullname")});
            res.redirect("/patientDashboard");
        }

        
        else {
            res.render("login",{msg: "Invalid username/password"});
        }
    }
    else if(user.usertype === "doctor") {
        console.log(req.body.password);
        console.log(user.password);
        const validUser = true
        if(validUser) {
            localStorage.setItem("user-type",user.usertype);
            localStorage.setItem("username",user.username);
            Doctors.findOne({username: req.body.username}, function(err, docs) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(docs.name)
                    localStorage.setItem('docname',docs.name)
                }
            })
            console.log(localStorage.getItem('docname'))
            console.log(localStorage.getItem('user-type'));
            const date_ob = await new Date();
            let date = (await date_ob.getDate()+1)
            let ndate = (await date_ob.getDate()+2)
            console.log(date,ndate)
            let month = ("0" + (await date_ob.getMonth() + 1)).slice(-2);
            let year = await date_ob.getFullYear();
            const tdate = year + "-" + month + "-" + date;
            const tdate1 = year + "-" + month + "-" + date;
            // slots=[true,true,true,false,true,true,true,true,true,true]
            Slots.findOne({username: user.username}, function (err, docs) {
                if(err) {
                    console.log(err);
                }
                else {
                    // global.slots = docs.slot2;
                    // console.log(slots)
                    console.log(docs.date);
                    Slots.updateMany({date:{$lt:date}}, {
                        $set: {slot0: docs.slot1},
                    }).then(
                        () => {
                            console.log("done")
                        }
                        ).catch(
                        (error) => {
                            
                        }
                    );
                    Slots.updateMany({date:{$lt:date}}, {
                            $set: {slot1: docs.slot2},
                        }).then(
                            () => {
                                console.log("done")
                            }
                            ).catch(
                            (error) => {
                                
                            }
                        );
                    Slots.updateMany({date:{$lt:date}}, {
                            $set: {slot2: docs.slot3},
                        }).then(
                            () => {
                                console.log("done")
                            }
                            ).catch(
                            (error) => {
                                
                            }
                        );
                    Slots.updateMany({date:{$lt:date}}, {
                            $set: {slot3: docs.slot4},
                        }).then(
                            () => {
                                console.log("done")
                            }
                            ).catch(
                            (error) => {
                                
                            }
                        );
                    Slots.updateMany({date:{$lt:date}}, {
                            $set: {slot4: docs.slot5},
                        }).then(
                            () => {
                                console.log("done")
                            }
                            ).catch(
                            (error) => {
                                
                            }
                        );
                    Slots.updateMany({date:{$lt:date}}, {
                            $set: {slot5: docs.slot6},
                        }).then(
                            () => {
                                console.log("done")
                            }
                            ).catch(
                            (error) => {
                                
                            }
                        );
                    Slots.updateMany({date:{$lt:date}}, {
                            $set: {slot6: docs.slot7},
                        }).then(
                            () => {
                                console.log("done")
                            }
                            ).catch(
                            (error) => {
                                
                            }
                        );
                    Slots.updateMany({date:{$lt:date}}, {
                            $set: {slot7: [true,true,true,true,true,true,true,true,true,true]},
                        }).then(
                            () => {
                                console.log("done")
                            }
                            ).catch(
                            (error) => {
                                
                            }
                        );
                    Slots.updateMany({date:{$lt:date}}, {
                            $set: {date: date},
                        }).then(
                            () => {
                                console.log("done")
                            }
                            ).catch(
                            (error) => {
                                
                            }
                        );
                }
            })
            res.redirect("doctorDashboard");
        }
    }
    else if(user.usertype === "admin") {
        console.log(req.body.password);
        console.log(user.password);
        const validUser = true
        if(validUser) {
            localStorage.setItem("user-type",user.usertype);
            localStorage.setItem("username",user.username);
            let adminname = "";
            Admins.findOne({username: user.username}, function(err, docs) {
                if(err) {
                    console.log(err);
                    res.redirect("login");
                }
                else {
                    adminname = docs.name;
                }
                localStorage.setItem('adminname',adminname);
                console.log(localStorage.getItem('adminname'));
            })
            res.redirect("/adminDashboard")
            console.log(localStorage.getItem('user-type'));
        }
    }
})

module.exports = router;