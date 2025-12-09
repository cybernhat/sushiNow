package com.example.sushiNow.service;

import com.example.sushiNow.model.RestaurantTable;
import com.example.sushiNow.repo.RestaurantTableRepo;
import com.example.sushiNow.model.Order;
import com.example.sushiNow.repo.OrderRepo;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantTableService {
    private final RestaurantTableRepo restaurantTableRepo;
    private final OrderRepo orderRepo;

    public List<RestaurantTable> getAllTables() {
        return restaurantTableRepo.findAll();
    }
    
   public RestaurantTable setVacancy(Long tableId) {
    RestaurantTable table = restaurantTableRepo.findById(tableId)
            .orElseThrow(() -> new RuntimeException("Table not found."));

    // Look for any orders that block vacancy
    List<Order> activeOrders = orderRepo.findByTableIdAndStatusIn(
            tableId,
            List.of("pending", "in progress")   // your string values
    );

    System.out.println(activeOrders);

    if (!activeOrders.isEmpty()) {
        throw new RuntimeException(
            "Cannot set vacancy. Orders are still in progress for this table."
        );
    }

    table.setOccupied(false);
    return restaurantTableRepo.save(table);
}
    
}  