const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();
const api = require('./routes/api');
const studApi = require('./routes/api1');

app.use(bodyParser.json());

app.use(cors());

app.use('/api', api);

app.use('/api1',studApi);

app.get('/' , function (req, res){
    res.send("Hello from server!")
});

app.post('/postDetails' , function(req,res){
    console.log(req.body);
    res.status(200).send({"message" : "Data Received!"})
});

app.listen(PORT , function(){
    console.log("server is running on port", PORT);
});