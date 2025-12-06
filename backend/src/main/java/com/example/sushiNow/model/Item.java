package com.example.sushiNow.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal price;
    private String description;
    private String category;
}
