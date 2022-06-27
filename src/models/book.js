import mongoose from "mongoose";
const Schema = mongoose.Schema;


export const BookSchema = new Schema({

    isbn:{
        type: String,
        unique: true
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    author: {
        type: String
    },
    category: {
        name: String,
        categoryId: String
        
        },
    publisher: {
        name: String,
        publisherId: String
    }

});

export const CategorySchema = new Schema({
name: String,
categoryId: String

})

export const PublisherSchema = new Schema({
    name: String,
    publisherId: String
})