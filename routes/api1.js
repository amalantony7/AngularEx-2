const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const Stud = require('../models/students');


const db = "mongodb+srv://useramal:user123@cluster0-ezoh7.mongodb.net/test?retryWrites=true&w=majority";

const secretKey = 'SECRET_KEY';

mongoose.connect(db, err=>{
    if(err){
        console.log("Error!" + err);
    }
    else{
        console.log("Connection SuccessFull!");
    }
})

router.post('/login', (req,res)=>{
    let userData = req.body;
    Stud.findOne({email : userData.email}, (error, user)=>{
        if(error){
            console.log("Error!"+ error);
        }
        else {
            if(!user){
                res.status(401).send("Invalid Email!");
            }else
                if(user.password !== userData.password){
                    res.status(401).send("Invalid Password!");
                }
            else{
                let payload = { subject : user._id};
                let token = jwt.sign(payload , secretKey , { expiresIn : '600s'});
                res.status(200).send({token});
            }
        }

    })
})

router.post('/register',(req,res)=>{
    let userData = req.body;
    let stud = new Stud(userData);
    stud.save((error,registeredUser)=>{
        if(error){
            console.log("Error!" + error);
        }else{
            let payload = { subject : registeredUser._id};
            let token = jwt.sign(payload , secretKey , { expiresIn : '600s'});
            res.status(200).send({token});
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
    jwt.verify(token , secretKey, (err,decoded)=>{
      if(err){
        return res.status(401).send("Token Expired!")
      }
      else {
        req.userId = decoded.subject
        next()
      }
    })
    
  }

  router.get('/display', verifyToken , (req,res) => {
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


//to verify the token stored in client-side local storage with token stored in server side,
//we need to send the token from browser to server using HTTP_Interceptor.
//Http_Interceptor intercepts outgoing http request, transforms them and sends it to server. 

module.exports = router;