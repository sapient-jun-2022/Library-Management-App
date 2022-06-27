// export const authenticateUser = async (req, res) => {
//     try {
//         let retEmployee = await Employee.findOne({ email: req.body.email });
//         const validateEmployee = await compare(req.body.password, retEmployee.password);


//         if (validateEmployee) {
//             res.send({ message: "User Validated" });
//         } else {
//             res.send({ message: "Sorry not validate credentials :" + req.body.email });
//         }
//     } catch (err) {
//         res.send({ message: "Error Authenticating :" + req.body.email });
//     }
// }

import { doCompare } from '../util/hash';
import { Users } from './users.controller';

const jwt = require('jsonwebtoken');

export const  authenticateToken = (req,res,next) => {

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerArray = bearerHeader.split(" ");
        const bearerToken = bearerArray[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, process.env.ACCESS_SECRET_KEY, (err, data) => {
            if (err) {
              res.json({
                status: false,
                errorCode: 401,
                message: "Authorizatin failed.",
              });
            } else {
              req.email = data.email;
            //   res.json({
            //     status: true,
            //     email: req.email
            //   });
              next();
            }
          });
    } else {
        res.json({
            status: false,
            errorCode: 401,
            message: "Authorizatin failed.",
          });
    }
    
}

export const authenticateUser = async (req, res, next) => {
    console.log('authenticateUser');
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      const isPassswordMatch = await doCompare(
        req.body.password,
        user.password
      );
      if (isPassswordMatch) {
        res.json({
            status: true,
            message: "Authenication Success",
            data: req.body
        });
      } else {
        res.json({
          status: false,
          message: "Incorrect password"
        });
      }
    } else {
      res.json({
        status: false,
        message: "Authenication failed",
      });
    }
  };
  
  export const loginUser = (req,res)=>{
    if(req.body.email && req.body.password) {        
        let user = {email:req.body.email, password: getHashed(req.body.password)};
        const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY);
        res.json({
            token: accessToken
        });
    } else {
        res.json({message:"Invalid email and password"});
    }
   
}