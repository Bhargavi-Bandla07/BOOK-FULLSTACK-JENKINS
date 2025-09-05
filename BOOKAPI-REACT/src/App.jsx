import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/bookapi/all")
      .then(res => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then(data => setBooks(data || []))
      .catch(err => {
        console.error("Could not load books:", err);
        setBooks([]);
      });
  }, []);

  const addBook = () => {
    const body = { title, author, price: Number(price) };
    setLoading(true);
    fetch("/bookapi/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => {
        setLoading(false);
        if (!res.ok) throw new Error("Add failed");
        return res.json();
      })
      .then(newBook => {
        setBooks(prev => [...prev, newBook]);
        setTitle(""); setAuthor(""); setPrice("");
      })
      .catch(err => {
        setLoading(false);
        console.error("Add book error:", err);
        alert("Failed to add book. See console.");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Book Management</h1>

      <div style={{ marginBottom: 12 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} style={{ marginLeft: 8 }} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={{ marginLeft: 8, width: 90 }} />
        <button onClick={addBook} style={{ marginLeft: 8 }} disabled={loading}>{loading ? "Adding..." : "Add Book"}</button>
      </div>

      <h2>All Books</h2>
      <ul>
        {books.length === 0 ? <li>No books yet</li> : books.map(b => (
          <li key={b.id}>{b.title} - {b.author} - ${b.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
