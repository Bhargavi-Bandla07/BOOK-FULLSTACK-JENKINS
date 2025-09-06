//package com.example.bookapi.model;
//
//import jakarta.persistence.*;
//
//@Entity
//public class Book {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
//    private String author;
//    private double price;
//
//    // Getters and Setters
//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }
//    public String getTitle() { return title; }
//    public void setTitle(String title) { this.title = title; }
//    public String getAuthor() { return author; }
//    public void setAuthor(String author) { this.author = author; }
//    public double getPrice() { return price; }
//    public void setPrice(double price) { this.price = price; }
//}


// src/main/java/com/example/bookapi/model/Book.java
//package com.example.bookapi.model;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "books")
//public class Book {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
//    private String author;
//    private Double price;
//
//    public Book() {}
//
//    public Book(String title, String author, Double price) {
//        this.title = title;
//        this.author = author;
//        this.price = price;
//    }
//
//    // getters & setters
//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }
//
//    public String getTitle() { return title; }
//    public void setTitle(String title) { this.title = title; }
//
//    public String getAuthor() { return author; }
//    public void setAuthor(String author) { this.author = author; }
//
//    public Double getPrice() { return price; }
//    public void setPrice(Double price) { this.price = price; }
//}
//



package com.example.bookapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // <- Long

    private String title;
    private String author;
    private Double price;

    public Book() {}

    public Book(String title, String author, Double price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
