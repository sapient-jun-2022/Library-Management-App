import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes, { route } from './src/routes/book.route'
import { getHashed } from './src/util/hash';
import { authenticateToken } from './src/controllers/authenticate.controllers';
// import { authenticateUser } from './src/controllers/authenticate.controllers';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/db_lib', { useNewUrlParser: true });
mongoose.connect(
    process.env.MONGO_CONNECTION_STRING,
    { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },(err) => {
    if (err) {
    console.log("error in connection");
    } else {
    console.log("mongodb atlas is connected");
    }});
// configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

routes(app);

app.get('/', (req,res)=>{
    console.log(`Server started at ${PORT}`);
});

app.use("/",route);
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
}) 

module.exports =app;