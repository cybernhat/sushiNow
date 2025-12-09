package com.example.sushiNow.controller;

import com.example.sushiNow.dto.*;
import com.example.sushiNow.model.*;
import com.example.sushiNow.service.*;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable Long orderId) {
        return orderService.findOrderById(orderId);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        Order order = orderService.createOrder(request);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @PatchMapping("/{orderId}/status")
    public Order updateOrderStatus(@RequestBody UpdateOrderStatusRequest request, @PathVariable Long orderId) {
        return orderService.updateOrderStatus(request, orderId);
    }
}