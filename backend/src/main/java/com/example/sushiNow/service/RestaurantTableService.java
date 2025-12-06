package com.example.sushiNow.service;

import com.example.sushiNow.model.RestaurantTable;
import com.example.sushiNow.repo.RestaurantTableRepo;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantTableService {
    private final RestaurantTableRepo restaurantTableRepo;

    public List<RestaurantTable> getAllTables() {
        return restaurantTableRepo.findAll();
    }
    
    public RestaurantTable setVacancy(Long tableId) {
        RestaurantTable table = restaurantTableRepo.findById(tableId)
                                .orElseThrow(() -> new RuntimeException("Table not found."));
        
        table.setOccupied(false);

        return restaurantTableRepo.save(table);
    }
    
}  