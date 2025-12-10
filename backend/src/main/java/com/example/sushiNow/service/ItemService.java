package com.example.sushiNow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.sushiNow.dto.OrderItemResponse;
import com.example.sushiNow.model.Item;
import com.example.sushiNow.model.OrderItem;
import com.example.sushiNow.repo.ItemRepo;
import com.example.sushiNow.repo.OrderItemRepo;
import com.example.sushiNow.repo.OrderRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepo itemRepo;
    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;

    public List<Item> getAllItems() {
        return itemRepo.findAll();
    };

    public List<Item> getItemsByCategory(String category) {
        return itemRepo.findByCategoryIgnoreCase(category);
    };

   public List<OrderItemResponse> getItemsByOrderId(Long orderId) {
        // optional: make sure order exists
        orderRepo.findById(orderId)
                 .orElseThrow(() -> new RuntimeException("Order not found"));

        // use the relation-based query
        List<OrderItem> orderItems = orderItemRepo.findByOrder_Id(orderId);

        // map to DTOs using your actual fields
        return orderItems.stream()
            .map(oi -> new OrderItemResponse(
                    oi.getItem().getId(),      // itemId
                    oi.getItem().getName(),
                    oi.getItem().getPrice(),    // item name
                    oi.getNotes()              // notes from order_items
            ))
            .toList();
    }

    public List<OrderItem> getOrderItem() {
        return orderItemRepo.findAll();
    }
}