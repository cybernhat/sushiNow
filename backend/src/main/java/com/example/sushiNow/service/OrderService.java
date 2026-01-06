package com.example.sushiNow.service;

import com.example.sushiNow.dto.*;
import com.example.sushiNow.model.*;
import com.example.sushiNow.repo.*;
import jakarta.transaction.Transactional;
import lombok.*;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final ItemRepo itemRepo;
    private final UserRepo userRepo;
    private final RestaurantTableRepo restaurantTableRepo;

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order findOrderById(Long id) {
        Order order = orderRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
        return order;
    }

    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        // Get user Id 
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get restaurant Id
        RestaurantTable table = restaurantTableRepo.findById(request.getTableId())
                .orElseThrow(() -> new RuntimeException("Table not found"));

        // create and save order
        Order order = new Order();
        order.setUser(user);
        order.setTable(table);
        order.setStatus("pending");
        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderRepo.save(order);

        for (CreateOrderRequest.Items reqItem : request.getItems()) {
            Item item = itemRepo.findById(reqItem.getItemId())
                    .orElseThrow(() -> new RuntimeException("Item not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setItem(item);
            orderItem.setNotes(reqItem.getNotes());

            orderItemRepo.save(orderItem);
        }

        table.setOccupied(true);

        restaurantTableRepo.save(table);

        return savedOrder;
    }
    
    @Transactional
    public Order updateOrderStatus(UpdateOrderStatusRequest request, Long orderId) {
        
        User user = userRepo.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found."));

        if (!"BOH".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Only BOH can update order status.");
        } 
        // je;;o
        Order order = orderRepo.findById(orderId)
                      .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(request.getStatus());
        return orderRepo.save(order);
    }
}