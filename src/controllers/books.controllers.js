import { BookSchema } from "../models/book";
import mongoose from "mongoose";
import { Users } from "./users.controller";


const Books = mongoose.model('Books', BookSchema);
const borrowedBooksSchema = mongoose.model("borrowedBooksSchema", borrowedBooksSchema); 


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
    Books.findById(req.params.bookId, (err, bookData) => {
        if (err) {
            res.send(err);
        }
        res.json(bookData);
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

export const reservebook = async (req,res) => {
  
    if(req.email && req.params.bookId) {
        const userObj = await Users.find({email:req.email});
        // if(userObj) {
        //     // let booksCount = await Users.count({borrowedBooks});
        //     let booksCounts = await Users.aggregate({$project:{ NumberOfElements: { $size:"$borrowedBooks" }}});
        //     if(booksCounts===process.env.MAX_NO_OF_RESERVE_BOOK) {
        //         res.send({
        //                   status: false,
        //                   message: "Maximum limit exceed to reserve this book",
        //               });
        //     }
        // }

        // var bookObj;
        // Books.findById(req.params.bookId, (err, bookData) => {
        //     if (err) {
        //         res.send({
        //             status: false,
        //             message: "Book not found",
        //             error: err
        //           });
        //     }
        //     bookObj = bookData;
        // });

å
        const bookObj = await Books.findById(req.params.bookId);

        if(!bookObj) {
            res.send({
                status: false,
                message: "Book not found",
              });
        } else {
        const borrowedBook = {
            title: bookObj.title,
            isbn:bookObj.isbn,
            createdAt: new Date(),
            dueDate:getDueDate()
        }
        const result = await Users.updateOne({},{ $push: { "borrowedBooks": borrowedBook }});
        if(result && result.modifiedCount) {
            res.json({ message: "Book reserved successfully.", data:bookObj });
        } else {
            res.json({ message: "Something went wrong"});
        }
      }
    } else {
        res.json({ message: "Something went wrong"});
    }
}


    export const getDueDate= () => {
        let tmpDate = new Date();
        tmpDate.setDate(tmpDate.getDate() + process.env.BOOK_RESERVE_DAYS);
        return tmpDate;
    }
   

