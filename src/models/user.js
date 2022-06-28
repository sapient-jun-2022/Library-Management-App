import mongoose from 'mongoose';
import { BookSchema } from './book';

const Schema = mongoose.Schema;

export const borrowedBooksSchema = new Schema({
    title: {
        type: String
    },
    isbn: {
        type: String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    dueDate:{
        type:Date
    }
}, { _id: false })

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: "Please enter first name"
    },
    lastName: {
        type: String,
        required: "Please enter last name",
    },
    userId: {
        type: String,
        required: 0,
    },
    password: {
        type: String,
        required: "Please enter password",
    },
    email: {
        type: String,
        lowercase: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    borrowedBooks:[borrowedBooksSchema]
}); 

module.exports = mongoose.model("Users", UserSchema); 
module.exports = mongoose.model("borrowedBooksSchema", borrowedBooksSchema); 
