var express = require("express");
var router = express.Router();
require("dotenv").config()

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient
const client = new mongoClient(process.env.DB_URL);
const bcryptjs = require("bcryptjs");

const nodemailer = require("nodemailer");


/* GET users listing. */
router.post("/", async function (req, res, next) {


  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;


  console.log(first_name, last_name, gender, email, password);




      const feedback = await client.db(process.env.DB_NAME).collection("user_info").findOne({email})
      console.log(feedback)

      if (feedback){
        res.send({
          message : "User already registered, can proceed to sign in",
          data: []
        })
      }else{
         let hashedPassword = await bcryptjs.hash(password, 12);


        const feedback = await client.db(process.env.DB_NAME).collection("user_info").insertOne({first_name, last_name, email, password: hashedPassword});

        if(feedback){

            res.send({
              message: "User Successfully registered, can proceed to sign in",
              data: {
                email,
              },
            });

          
        }
      

      }


  // res.send("respond with a resource");




});

module.exports = router;
