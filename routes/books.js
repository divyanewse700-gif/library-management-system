const express = require("express");
let books = require("../data/books.json").books;

const router = express.Router();

/**
 * Route:/books
 * Method:GET
 * Descsription:Get all the list of books in the system
 * Access:Public
 * Parameters:None
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * Route:/books/:id
 * Method:GET
 * Descsription:Get a books by their ID
 * Access:Public
 * Parameters:id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: `books not found ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * Route:/books
 * Method:POST
 * Descsription:CREATE A NEW book
 * Access:Public
 * Parameters:NONE
 */
router.post("/", (req, res) => {
  const { id, name, author, genre, price, publisher } = req.body;

  if (!id || !name || !author || !genre || !price || !publisher) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const book = books.find((b) => b.id === id);

  if (book) {
    return res.status(409).json({
      success: false,
      message: `Book already exists with id ${id}`,
    });
  }

  books.push({ id, name, author, genre, publisher });

  res.status(201).json({
    success: true,
    message: "Book added successfully",
  });
});

/**
 * Route:/books/:id
 * Method:PUT
 * Descsription:Update a new book by their ID
 * Access:Public
 * Parameters:ID
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  //check if the book exists
  const book = books.find((each) => each.id === id);
  if (!books) {
    return res.status(404).json({
      success: false,
      message: `book not found for id:${id}`,
    });
  }

  //object.assign(book,data);
  //with spread operator
  const updatedBook = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  res.status(200).json({
    success: true,
    data: updatedBook,
    message: "book updated successfully",
  });
});



module.exports = router;
