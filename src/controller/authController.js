const User = require("../model/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = require("../schema/user");
const secretKey = '8454dbad43ee0ba1d6511a887367f26ca158fd78be75f619b6cdfbb9a2eb0288'


exports.postSignup = (req,res, next) => {

    const { error } = userSchema.validate(req.body);

    if(!error){

       const apiKey = crypto.randomBytes(10).toString('hex');
       const { name, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        const user = new User(name, email, hash, apiKey);
        user.save()
          .then(result => {
            const userPayload = {...req.body, apikey: apiKey, userId : result.insertedId}
            delete userPayload.password
            const token = jwt.sign(userPayload, secretKey, {expiresIn:"1h"});
            res.cookie("token", token)
            res.status(201).json({
              message: 'User created successfully',
              token: token
            });
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
      }
    });

    }else {
      res.status(400).send({error: "Invalid Parameter"});
    }

    

}

exports.postLogin = (req,res, next) => {

  const { email, password } = req.body;
  
  if(email === undefined || password === undefined){
     return res.status(400).json({ message: 'Invalid Parameter' });
  }else {

    User.getUser(email)
    .then(user => {
      
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed', details : "No user found" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        console.log(result);
        if (err) {
          return res.status(401).json({ message: 'Incorrect Password' });
        }
        if (result) {
          const token = jwt.sign(
            { email: user.email, userId: user._id, apikey : user.apikey},
           secretKey,
            { expiresIn: '1h' }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
        return res.status(401).json({ message: 'Authentication Error' });
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
    
  }
  
    
}
