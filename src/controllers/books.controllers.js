import { BookSchema } from "../models/book";
import mongoose from "mongoose";


const Books = mongoose.model('Books', BookSchema);

export const home = (req, res) => {
    res.json({ "message": "Welcome from Express" });
}



export const getAllBooks =(req,res)=>{
    Books.find({}, (err, books)=>{
        if(err) {
            res.json({status: false,
                message: "Something went wrong"});
        } 
        res.send(books);
    })
}

export const addBook = async (req, res) => {
    let book = req.body;
    let newBook = new Books(book);

    try {
        let respbook = await newBook.save();
        res.send({message:"Book added successfully", data: respbook});
    } catch (err) {
        res.json({status: false,
            message: "Something went wrong"})
    }
}


// get book by id 
export const getBooksById = (req, res) => {
    Books.findById(req.params.bookId, (err, employee) => {
        if (err) {
            res.send(err);
        }
        res.json(employee);
    })
}

// update Book
export const updateBooks = (req, res) => {
    Books.findByIdAndUpdate({ _id: req.params.bookId }, req.body, { new: true }, (err, updatedBooks) => {
        if (err) {
            res.json({
                status: false,
                message: "updation failed",
                error: err
              });
        }
        res.json({ message: "book updated successfully.", data:updatedBooks });

    })
}

// delete book
export const deleteBooksById = (req, res) => {
    console.log('deleteBooksById',req.params)
    Books.findByIdAndDelete({ _id: req.params.bookId }, (err, data) => {
        if (err) {
            res.json({
                status: false,
                message: "Deletion failed",
                error: err
              });
        }
        res.json({ message: "Book deleted successfully.", data:data });
    })
}