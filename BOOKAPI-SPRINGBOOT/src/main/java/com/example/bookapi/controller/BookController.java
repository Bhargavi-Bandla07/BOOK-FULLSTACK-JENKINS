package com.example.bookapi.controller;

import com.example.bookapi.model.Book;
import com.example.bookapi.repository.BookRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")                 // <- clear, conventional path
@CrossOrigin(origins = "http://localhost:2030") // allow your frontend origin (adjust if different)
public class BookController {

    private final BookRepository repo;

    public BookController(BookRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/all")
    public List<Book> getAll() {
        return repo.findAll();
    }

    @PostMapping("/add")
    public Book addBook(@RequestBody Book book) {
        return repo.save(book);
    }
}
