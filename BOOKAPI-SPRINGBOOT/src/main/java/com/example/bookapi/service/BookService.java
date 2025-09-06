package com.example.bookapi.service;

import java.util.List;
import com.example.bookapi.model.Book;

public interface BookService {
    // Adds a new book to the database.
    Book addBook(Book book);

    // Retrieves a list of all books.
    List<Book> getAllBooks();

    // Retrieves a single book by its ID.
    Book getBookById(int id);

    // Updates an existing book.
    Book updateBook(Book book);

    // Deletes a book by its ID.
    void deleteBookById(int id);
}
