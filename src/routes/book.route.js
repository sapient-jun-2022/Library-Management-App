
import { authenticateToken, authenticateUser } from "../controllers/authenticate.controllers";
import { addBook, getAllBooks, home } from "../controllers/books.controllers";
import * as booksController from "../controllers/books.controllers";

import * as userController from "../controllers/users.controller";
import express from "express";

export const route = express.Router();

const routes = (app) => {
   app.route('/users')
  .post(userController.addNewUsers)

  app.route('/login')
  .post(authenticateUser);

}

route.use(authenticateToken);
route.route("/users").get(userController.getAllUsers);
route.route("/users/:userId").put(userController.updateUsers).delete(userController.deleteUserById);

route.route("/books").get(booksController.getAllBooks).post(booksController.addBook);
route.route("/books/:bookId").put(booksController.updateBooks).delete(booksController.deleteBooksById);


route.route("/").get(home);


// route.route("/login").post(authenticateUser);
// route.route("/authorize");

export default routes;