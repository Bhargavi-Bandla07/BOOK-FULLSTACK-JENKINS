//package com.example.bookapi.controller;
//
//import com.example.bookapi.model.Book;
//import com.example.bookapi.repository.BookRepository;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/bookapi")
//@CrossOrigin(origins = "*") 
//public class BookController {
//    private final BookRepository repo;
//
//    public BookController(BookRepository repo) {
//        this.repo = repo;
//    }
//    
//    @GetMapping("/")
//    public String home1() 
//    {
//        return "Jenkins Full Stack Deployment Practice";
//    }
//    @GetMapping("/all")
//    public List<Book> getAll() {
//        return repo.findAll();
//    }
//
//    @PostMapping("/add")
//    public Book addBook(@RequestBody Book book) {
//        return repo.save(book);
//    }
//}


// src/main/java/com/example/bookapi/controller/BookController.java
//package com.example.bookapi.controller;
//
//import com.example.bookapi.model.Book;
//import com.example.bookapi.repository.BookRepository;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/bookapi")
//@CrossOrigin(origins = "*")
//public class BookController {
//    private final BookRepository repo;
//
//    public BookController(BookRepository repo) {
//        this.repo = repo;
//    }
//
//    @GetMapping("/")
//    public String home1() {
//        return "Jenkins Full Stack Deployment Practice";
//    }
//
//    @GetMapping("/all")
//    public List<Book> getAll() {
//        return repo.findAll();
//    }
//
//    @PostMapping("/add")
//    public Book addBook(@RequestBody Book book) {
//        return repo.save(book);
//    }
//}




package com.example.bookapi.controller;

import com.example.bookapi.model.Book;
import com.example.bookapi.repository.BookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bookapi")
@CrossOrigin(origins = "*")
public class BookController {
    private final BookRepository repo;

    public BookController(BookRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/")
    public String home1() {
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

    // UPDATE a book by id
    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(
            @PathVariable("id") Long id,
            @RequestBody Book updated) {

        Optional<Book> opt = repo.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Book existing = opt.get();
        existing.setTitle(updated.getTitle());
        existing.setAuthor(updated.getAuthor());
        existing.setPrice(updated.getPrice());
        Book saved = repo.save(existing);
        return ResponseEntity.ok(saved);
    }

    // DELETE a book by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
