import mongoose from "mongoose";
import { UserSchema } from "../models/user";

const Users =  mongoose.model('Users', UserSchema);

export const home = (req, res) => {
    res.json({ "message": "Welcome from Express" });
}


export const addNewUsers = async (req,res) => {
   const userObj = req.body;
   if (!userObj.userId && !userObj.password && !userObj.firstName && !userObj.lastName && !userObj.email) {
    res.status(400).send({ message: "Content can not be empty!" });
   }
   if(userObj!=={}) {
    let newUser = new Users(userObj);
    try{
       let respUser = await newUser.save();
       res.send({message:"User added successfully", data: respUser});
    } catch (err){
       res.send(err)
    }
   }
}


export const getAllUsers = async(req,res) => {

 Users.find({}, (err, users)=>{
    if(err) {
        res.send(err);
    }
    res.send(users);
})
    
}