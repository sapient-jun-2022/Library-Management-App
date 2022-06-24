
import { addBook, getAllBooks, home } from "../controllers/books.controllers";
import { addNewUsers, getAllUsers } from "../controllers/users.controller";

const routes = (app) => {

    // home route for demo
    app.route("/")
        .get(home);

   // authentication route 
   app.route('/books')
   .get(getAllBooks)
   .post(addBook);

   app.route('/users')
   .get(getAllUsers)
   .post(addNewUsers)

}
export default routes;