const express = require('express');
const { Result } = require('express-validator');
      passport = require('passport');
      mongoose = require('mongoose');
      alert = require('alert');
      const bcrypt = require("bcryptjs");
app=express();
      passport = require('passport');
      bodyParser = require('body-parser');
      LocalStrategy = require('passport-local');
      passportLocalMongoose = require('passport-local-mongoose');
    
      app.use(require("express-session") ({
        secret:"Any normal Word",//decode or encode session
        resave: false,          
        saveUninitialized:false   
    }));
var Schema = mongoose.Schema;
// passport.serializeUser(User.serializeUser());       //session encoding
// passport.deserializeUser(User.deserializeUser());   //session decoding
// passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
    { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());
app.use( express.static( "public" ) );
app.use(bodyParser.json());



app.use("/", require("./routes"));

mongoose.connect("mongodb://127.0.0.1/healthvault");


app.listen(process.env.PORT || 8080, function (err) {
    if(err) {
        console.log(err);
    }
    else {
        console.log("Server started at 8080");
    }
})