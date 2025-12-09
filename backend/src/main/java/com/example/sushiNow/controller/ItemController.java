package com.example.sushiNow.controller;

import com.example.sushiNow.model.Item;
import com.example.sushiNow.service.ItemService;
import com.example.sushiNow.dto.*;
import com.example.sushiNow.service.OrderService;
import lombok.*;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/category/{category}")
    public List<Item> getItemsByCategory(@PathVariable String category) {
        return itemService.getItemsByCategory(category);
    }

    @GetMapping("/order/{orderId}")
    public List<OrderItemResponse> getOrderItems(@PathVariable Long orderId) {
    return itemService.getItemsByOrderId(orderId);
}
}
