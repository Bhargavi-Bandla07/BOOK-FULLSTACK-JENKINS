import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");

  // Fetch all books
  useEffect(() => {
    fetch("http://localhost:8081/bookapi/all")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  // Add book
  const addBook = () => {
    fetch("http://localhost:8081/bookapi/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, price })
    })
      .then(res => res.json())
      .then(newBook => {
        setBooks([...books, newBook]); // add new book without reload
        setTitle("");
        setAuthor("");
        setPrice("");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Book Management</h1>

      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={addBook}>Add Book</button>

      <h2>All Books</h2>
      <ul>
        {books.map(b => (
          <li key={b.id}>{b.title} - {b.author} - ${b.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
