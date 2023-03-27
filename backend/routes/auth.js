const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET="shivamisgood$boy";
// route 1: create a user post "/api/auth/createuser" . no login required
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 5 }),
    body("email", "enter a valid  email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ], 
  async (req, res) => {
    let success = false;
    //if there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    // cheack wether the user this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
     const secPass = await bcrypt.hash(req.body.password,salt);

      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      const data ={
        user:{
            id:user.id
        }
      }
      const authtoken= jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken})
    //   res.json(user);
      // catch error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    //   res.json({error:"please enter a unique value for email",message:err.message})})
  }
);
//  route 2 : authenticate a user using post "api/auth/login" no required login
router.post('/login', [ 
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password cannot be blank').exists(), 
  ], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success=false;
        return res.status(400).json({success,error: "Please try to login with correct credentials"});
      }
  
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
     success=true;
      res.json({success,authtoken})
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  }) 
  // route 3 : get loggedin user details using : post "/api/uth/getuser" .login required 
  router.post('/getuser', fetchuser,
    async (req, res) => {

  try {
    userId= req.user.id;
     const user = await User.findById(userId).select("-password");
     res.send(user);
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
 } )
module.exports = router;
