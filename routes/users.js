const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
// const passport = require("passport");
const router = express.Router();
const app = express();

require("../models/User");
const User = mongoose.model("Users");

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

router.get("/login" , (req , res) =>{
 res.render("users/login");

});


router.get("/register" , (req , res) =>{
 res.render("users/register");

});

router.post("/register", (req, res) => {
 
 let errors = [];

 if(req.body.password != req.body.password2){
     errors.push({text: "password does not match"});
 }

 if(req.body.password.length < 4 ){
     errors.push({ text:"password length should atleast be 4 characters"});
 }
 
 if (errors.length > 0){

     res.render('users/register');
 }
});
module.exports = router;