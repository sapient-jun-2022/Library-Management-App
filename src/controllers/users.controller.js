import mongoose from "mongoose";
import { UserSchema } from "../models/user";
import { authenticateUser } from "../controllers/authenticate.controllers";
import { getHashed } from "../util/hash";




export const Users =  mongoose.model('Users', UserSchema);

export const home = (req, res) => {
    res.json({ "message": "Welcome from Express" });
}


export const addNewUsers = async (req,res) => {
   const userObj = req.body;
   const userCount = await Users.count({ email: req.body.email });
  if (userCount) {
    res.status(500);
    return res.json({
      status: 500,
      error: "User is already exists",
    });
  }
   if (!userObj.password && !userObj.firstName && !userObj.lastName && !userObj.email) {
      res.json({
         status: false,
         errorCode: 401,
         message: "Content can not be empty!",
       });
   }
   if(userObj!=={}) {
    userObj.password = await getHashed(userObj.password);

    let newUser = new Users(userObj);
    try {
       let respUser = await newUser.save();
       res.send({message:"User added successfully", data: respUser});
    } catch (err){
      res.json({status: false,
         message: "Something went wrong", error: err});
    }
   } else {
      res.send({message:"Bad request", data: req.body});
   }
}


export const getAllUsers = async(req,res) => {
if(req.email) {
   Users.find({}, (err, users)=>{
      if(err) {
         res.json({status: false,
            message: "Something went wrong", error: err});
      }
      res.send(users);
   })
 }

}

 // update User
export const updateUsers = async (req, res) => {
   req.body.password = await getHashed(req.body.password);
   console.log('updateUsers', req.body);
   Users.findByIdAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, updatedUser) => {
       if (err) {
         res.json({status: false,
            message: "Something went wrong", error: err});
       }
       res.send({message:"User updated successfully", data: updatedUser});
   })
}

// delete 
export const deleteUserById = (req, res) => {
   Users.findByIdAndDelete({ _id: req.params.userId }, (err, data) => {
       if (err) {
         res.json({status: false,
            message: "Something went wrong", error: err});
       }
       res.send({message:"User updated successfully", data: data});
   })
}   