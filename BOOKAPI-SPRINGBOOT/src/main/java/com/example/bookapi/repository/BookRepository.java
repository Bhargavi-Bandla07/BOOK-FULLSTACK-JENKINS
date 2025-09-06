//package com.example.bookapi.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import com.example.bookapi.model.Book;
//
//@Repository
//public interface BookRepository extends JpaRepository<Book, Integer> {
//
//}



package com.example.bookapi.repository;

import com.example.bookapi.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {  // <- Long
}
