package com.example.sushiNow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sushiNow.dto.OrderItemResponse;
import com.example.sushiNow.model.Item;
import com.example.sushiNow.model.OrderItem;
import com.example.sushiNow.repo.OrderItemRepo;
import com.example.sushiNow.service.ItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;
    private final OrderItemRepo orderItemRepo;

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

    @GetMapping("/orders")
    public List<OrderItem> getOrderItem() {
        return orderItemRepo.findAll();
    }
}
