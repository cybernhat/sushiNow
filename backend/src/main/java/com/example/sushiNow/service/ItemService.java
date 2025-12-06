package com.example.sushiNow.service;

import com.example.sushiNow.model.Item;
import com.example.sushiNow.repo.ItemRepo;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepo itemRepo;

    public List<Item> getAllItems() {
        return itemRepo.findAll();
    };

    public List<Item> getItemsByCategory(String category) {
        return itemRepo.findByCategoryIgnoreCase(category);
    };
}