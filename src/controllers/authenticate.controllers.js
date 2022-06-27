// export const authenticateUser = async (req, res) => {
//     try {
//         let retEmployee = await Employee.findOne({ email: req.body.email });
//         const validateEmployee = await compare(req.body.password, retEmployee.password);

//         if (validateEmployee) {
//             res.send({ message: "User Validated" });
//         } else {
//             res.send({ message: "Sorry not validate credentials :" + req.body.email });
//         }
//     } catch (err) {
//         res.send({ message: "Error Authenticating :" + req.body.email });
//     }
// }



export const  authenticateUser = (req,res,next) => {
    console.log('req.headers',req.headers['authorization'])
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(401);
    }
    
}