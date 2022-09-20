var express = require("express");
var router = express.Router();
require('dotenv').config()
const mongodb = require("mongodb")

const mongoClient = mongodb.MongoClient

const client = new mongoClient(process.env.DB_URL)


const bcryptjs = require("bcryptjs")

/* GET users listing. */
router.post("/", async function (req, res, next) {

  let email = req.body.email;
  let password = req.body.password;

  // res.send("acknowledegr")
  // return

  // check if he is a registered users

  let feedback = await client.db(process.env.DB_NAME).collection("user_info").findOne({email});
  if(feedback){
    const isMatchedPassword = await bcryptjs.compare(password, feedback.password);

    if(isMatchedPassword){
      res.send({
        message: "Email and password matched",
        data : {email: feedback.email, first_name: feedback.first_name, last_name: feedback.last_name, gender: feedback.gender}
      })
    }
    else{
      res.send({
        message: "Email found but incorrect password",
        data: []

      })
    }
  }else{
    res.send({
      message: "Email does not exist",
      data: []

    })
  }


});

module.exports = router;
