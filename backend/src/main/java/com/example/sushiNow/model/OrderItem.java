package com.example.sushiNow.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;
    private String notes;
}