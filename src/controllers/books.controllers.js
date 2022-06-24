import { BookSchema } from "../models/book";
import mongoose from "mongoose";


const Books = mongoose.model('Books', BookSchema);

export const home = (req, res) => {
    res.json({ "message": "Welcome from Express" });
}



export const getAllBooks =(req,res)=>{
    Books.find({}, (err, books)=>{
        if(err) {
            res.json({message: "Something went wrong"})
        } 
        res.send(books);
    })
}

export const addBook = async (req, res) => {
    let book = req.body;
    let newBook = new Books(book);

    try {
        let respbook = await newBook.save();
        res.send(respbook);
    } catch (err) {
        res.send(err);
    }
}