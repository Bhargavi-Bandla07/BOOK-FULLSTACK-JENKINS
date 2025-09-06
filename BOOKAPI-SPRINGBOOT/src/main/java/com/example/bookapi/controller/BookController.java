package com.example.bookapi.controller;

import com.example.bookapi.model.Book;
import com.example.bookapi.repository.BookRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/bookapi")
public class BookController {
    private final BookRepository repo;

    public BookController(BookRepository repo) {
        this.repo = repo;
    }
    
    @GetMapping("/")
    public String home1() 
    {
        return "Jenkins Full Stack Deployment Practice";
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
