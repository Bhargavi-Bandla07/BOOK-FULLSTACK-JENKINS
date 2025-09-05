import { useState, useEffect } from "react";
import config from "./config"; // adjust path if needed

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${config.url}/all`)
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
    fetch(`${config.url}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => {
        setLoading(false);
        if (!res.ok) throw new Error("Add failed: " + res.status);
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

  // ... JSX unchanged ...
}
export default App;
