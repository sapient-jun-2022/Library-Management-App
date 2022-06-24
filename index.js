import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/book.route'

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db_lib', (res) => { console.log("[+] Succesfully connected to database.",res); });
// mongoose.connect('mongodb://localhost/db_lib', { useNewUrlParser: true });

// configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

routes(app);

app.get('/', (req,res)=>{
    console.log(`Server started at ${PORT}`);

});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
}) 

module.exports =app;