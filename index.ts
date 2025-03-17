import express from "express";
const app = express();
const port = process.env.port || 3000;

app.use(express.json());

let books = [
  {
    id: 1,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "sci-fi",
  },
  {
    id: 2,
    title: "The Final Empire",
    author: "Brandon Sanderson",
    genre: "fantasy",
  },
];

// GET retrieve all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET find an specific book by its id
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST upload a new book to the list
app.post("/books", (req, res) => {
  const { title, author, genre } = req.body;
  if (!title || !author || !genre) {
    return res.status(400).json({ error: "Missing data for posting." });
  }
  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT edit properties from an existing book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  const { title, author, genre } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.genre = genre || book.genre;
  res.json(book);
});

// DELETE remove a book from the collection
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });
  const deletedBook = books.splice(index, 1);
  res.json(deletedBook);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
