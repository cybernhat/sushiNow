package com.example.orderNow.repo;

import com.example.orderNow.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepo extends JpaRepository<Item, Long> {
    // get items by category
    List<Item> findByCategoryIgnoreCase(String category);
}