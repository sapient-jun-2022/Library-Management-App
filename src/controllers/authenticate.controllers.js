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