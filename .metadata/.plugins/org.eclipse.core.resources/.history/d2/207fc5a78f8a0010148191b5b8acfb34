package com.example.bookapi.controller;

import com.example.bookapi.model.Book;
import com.example.bookapi.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookapi")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend React app
public class BookController {
    private final BookRepository repo;

    public BookController(BookRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/all")
    public List<Book> getAll() {
        return repo.findAll();
    }

    @GetMapping("/get/{id}")
    public Book getById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @PostMapping("/add")
    public Book addBook(@RequestBody Book book) {
        return repo.save(book);
    }

    @PutMapping("/update/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        book.setId(id);
        return repo.save(book);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBook(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
