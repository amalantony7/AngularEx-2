const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

//connection string from mongoDB atlas
const db ="mongodb+srv://useramal:user123@cluster0-ezoh7.mongodb.net/test?retryWrites=true&w=majority";

var responseObject = [];

//connection to db
mongoose.connect(db, err => {
    if(err){
        console.error("Error!" + err);
    }
    else{
        console.log("Connection Successful!");
    }
})


//sample api connection to server
router.get('/', (req,res) => {
    res.send("From API route");
})


//post request to register
router.post('/register', (req,res)=>{
    let userData = req.body; //extract user information from req body
    let user  = new User(userData); //new user model with userData
    user.save((error, registeredUser)=>{
        if(error){
            console.log(error);
        }
        else{
            let payload = { subject : registeredUser._id};
            let token = jwt.sign(payload, 'secretKey'); //for authentication using jwt

            res.status(200).send({token});
        }
    })
})

router.post('/login', (req,res) => {
    let userData = req.body;
    User.findOne({email : userData.email}, (error , user) => {
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send("Invalid User");
            }
            else
            if(user.password !== userData.password){
                res.status(401).send("Invalid Password");
            }
            else{
                let payload = {subject : user._id};
                let token = jwt.sign(payload, 'secretKey' , {"expiresIn" : 1800});
                res.status(200).send({token});
            }
        }
    })
})


//get all records from database
router.get('/employees', (req, res)=>{
    User.find({}, (err, foundData)=>{
      if(err){
        console.log("Error! " + err);
        res.status(500).send("Couldn't read data from Database!");
      }
      else{
          responseObject = foundData;
          
          res.status(200).send(responseObject);
        }
      })
    })


   //search a record from database 
    router.get('/employee', (req, res)=>{   
      User.find({email: req.query.email}, (err, foundData)=>{
        if(err){
          console.log("Error! " + err);
          res.status(500).send("Couldn't read data from Database!");
        }
        else{
            responseObject = foundData;
            
            res.status(200).send(responseObject);
          }
        })
      })

  
      router.delete('/delete', (req, res)=>{   
        User.deleteOne({email: req.query.email}, (err, foundData)=>{
          if(err){
            console.log("Error! " + err);
            res.status(500).send("Couldn't read data from Database!");
          }
          else{            
              res.status(200).send();
            }
          })
        })    
  



function verifyToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send("Unauthorized Request!")
  }
  let token = req.headers.authorization.split(" ")[1]
  if(token === "null"){
    return res.status(401).send("Unauthorized Request!")
  }
  jwt.verify(token , 'secretKey', (err,decoded)=>{
    if(err){
      return res.status(401).send("Token Expired!")
    }
    else {
      req.userId = decoded.subject
      next()
    }
  })
  
}



router.get('/userdata', (req,res)=>{
    let events=[{
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ];
    res.json(events);
})

router.get('/special', verifyToken, (req,res)=>{
    let special=[{
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ];
    res.json(special);
})

router.get('/cars' , (req,res)=>{
    let cars = [
      {
        "_id" : "1",
        "name" : "MG Hector",
        "des" : "lorem ipsum",
        "color" : 'Blue'
      },
      {
        "_id" : "2",
        "name": "Ford",
        "des" : "lorem ipsum",
        "color": 'Brown'
      },
      {
        "_id" : "3",
        "name": "Kia",
        "des" : "lorem ipsum",
        "color": 'Grey'
      },
      {
        "_id" : "4",
        "name": "BMW",
        "des" : "lorem ipsum",
        "color": 'Red'
      },
      {
        "_id" : "5",
        "name": "Jaguar",
        "des" : "lorem ipsum",
        "color": 'Silver'
      },
      {
        "_id" : "6",
        "name": "Jeep",
        "des" : "lorem ipsum",
        "color": 'Black'
      }
    ];
    res.json(cars);
})


module.exports = router;




