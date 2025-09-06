import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
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

  // Add or Update book
  const saveBook = () => {
    const body = { title, author, price: Number(price) };
    setLoading(true);

    const url = editId ? `/bookapi/update/${editId}` : "/bookapi/add";
    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => {
        setLoading(false);
        if (!res.ok) throw new Error("Save failed");
        return res.json();
      })
      .then(savedBook => {
        if (editId) {
          // update existing
          setBooks(prev => prev.map(b => (b.id === editId ? savedBook : b)));
        } else {
          // add new
          setBooks(prev => [...prev, savedBook]);
        }
        resetForm();
      })
      .catch(err => {
        setLoading(false);
        console.error("Save book error:", err);
        alert("Failed to save book. See console.");
      });
  };

  // Delete book
  const deleteBook = (id) => {
    fetch(`/bookapi/delete/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        return res.text();
      })
      .then(() => setBooks(prev => prev.filter(b => b.id !== id)))
      .catch(err => {
        console.error("Delete error:", err);
        alert("Failed to delete book");
      });
  };

  // Start editing
  const startEdit = (book) => {
    setEditId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);
  };

  // Reset form
  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setAuthor("");
    setPrice("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Book Management</h1>

      <div style={{ marginBottom: 12 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} style={{ marginLeft: 8 }} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={{ marginLeft: 8, width: 90 }} />
        <button onClick={saveBook} style={{ marginLeft: 8 }} disabled={loading}>
          {loading ? "Saving..." : editId ? "Update Book" : "Add Book"}
        </button>
        {editId && <button onClick={resetForm} style={{ marginLeft: 8 }}>Cancel</button>}
      </div>

      <h2>All Books</h2>
      <ul>
        {books.length === 0 ? <li>No books yet</li> : books.map(b => (
          <li key={b.id}>
            {b.title} - {b.author} - ${b.price}
            <button onClick={() => startEdit(b)} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => deleteBook(b.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
