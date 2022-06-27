import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/book.route'
import { authenticateUser } from './src/controllers/authenticate.controllers';

const jwt = require('jsonwebtoken')
const app = express();
const PORT = 3000;
const ACCESS_SECRET_KEY="d9355e51fa2f74222580f98bff5af679d99f21128e70ae1f4abd84e9db530996f72e008c8fa52977bf1adc91fbe0c091dd275777c7070961b5101616181668e";



const connection_string = "mongodb+srv://rohit-manora:Rohit&1234@cluster0.bjqdx.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/db_lib', (res) => { console.log("[+] Succesfully connected to database.",res); });
// mongoose.connect('mongodb://localhost/db_lib', { useNewUrlParser: true });
mongoose.connect(
    connection_string,
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

app.post('/login', (req,res)=>{
    console.log('req',req);
    
    let email = req.body.email;
    let user = {email:email};
    const accessToken = jwt.sign(user, ACCESS_SECRET_KEY);
    console.log('accessToken key', process.env.ACCESS_SECRET_KEY);
    console.log('accessToken',accessToken);

    res.json({
        token: accessToken
    });

});

// app.get("/users", authenticateUser, (req, res) => {
//     jwt.verify(req.token, ACCESS_SECRET_KEY, (err, data) => {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 msg: "This is protected route",
//                 data: data
//             });
//         }
//     });
// });


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
}) 

module.exports =app;