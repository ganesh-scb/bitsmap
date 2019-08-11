var express = require('express');
var cors = require('cors');
var app=express();
var bodyParser = require('body-parser');
const fs = require('fs');
const jsonfile = require('jsonfile');
const file = 'users.json';

/* password encryption / decryption */
const CryptoJS = require("crypto-js");
const secretKey = 'bitsmap-scb';
function encrypt(str) {
  const ciphertext = CryptoJS.AES.encrypt(str, secretKey);
  return ciphertext.toString();
}
function decrypt(ciphertext) {
  var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req,res)
{
  res.status(401);
  res.send('No access');
});
app.post('/login', function(req,res) {
  let users = {}
  jsonfile.readFile(file)
    .then(obj => {
      users = obj;
      if (req.body.type === 'signUp') {
        if(users[req.body.userName]) {
          res.status(401);
          res.send('User name already exists');
        } else {
          users[req.body.userName] = encrypt(req.body.password);
          jsonfile.writeFile(file, users)
            .then(response => {
              res.status(200);
              res.send('loggedIn');
            })
            .catch(error => {
              res.status(401);
              res.send(error);
            })
        }
      } else if (req.body.type === 'login') {
        if(users[req.body.userName]) {
          if(decrypt(users[req.body.userName]) === req.body.password) {
            res.status(200);
            res.send('loggedIn');
          } else {
            res.status(401);
            res.send('Invalid username / password.');
          }
        } else {
          res.status(401);
          res.send('Unauthorized user.');
        }
      }
    })
    .catch(error => {
      console.error(error)
    })
  })
var server=app.listen(8080, function() {
  console.log('server is running at 8080')
});
