
//To using supertest to test HTTP requests/responses
const request = require("supertest");
//To need our app for the correct routes!
const app = require("../");

describe("GET /Books", () => {
    test("It responds with an array of Books", async () => {
      const response = await request(app).get("/books");
      expect(response.body.length).toBe(2);
      expect(response[0]).toHaveProperty("isbn");
      expect(response[0]).toHaveProperty("title");
      expect(response[0]).toHaveProperty("price");
      expect(response[0]).toHaveProperty("author");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("POST /books", () => {
    test("It responds with the newly created book", async () => {
      const newBook = await request(app)
        .post("/books")
        .send({
          name: "New Book"
        });
  
      expect(newBook.data._id).toHaveProperty("_id");
      expect(newBook.data.name).toBe("isbn");
      expect(newBook.data.name).toBe("title");
      expect(newBook.data.name).toBe("price");
      expect(newBook.statusCode).toBe(200);
  
      // const response = await request(app).get("/books");
      // expect(response.length).toBe(3);
    });
  });



  describe("DELETE /books/1", () => {
    test("It responds with a message of Deleted", async () => {
      const newBook = await request(app)
        .post("/books")
        .send({
          name: "Another one"
        });
      const removedStudent = await request(app).delete(
        `/books/${newBook.body.id}`
      );
      expect(removedStudent.body).toEqual({ message: "Book deleted successfully." });
      expect(removedStudent.statusCode).toBe(200);
  
      // const response = await request(app).get("/books");
      // expect(response.body.length).toBe(2);
    });
  });