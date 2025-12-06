package com.example.sushiNow.controller;

import com.example.sushiNow.service.*;
import com.example.sushiNow.model.*;
import lombok.*;
import org.springframework.web.bind.annotation.*;
import com.example.sushiNow.model.RestaurantTable;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class RestaurantTableController {
    private final RestaurantTableService restaurantTableService;

    @GetMapping
    public List<RestaurantTable> getAllTables() {
        return restaurantTableService.getAllTables();
    }

    @PatchMapping("/{tableId}")
    public RestaurantTable setVacancy(@PathVariable Long tableId) {
        return restaurantTableService.setVacancy(tableId);
    }


}