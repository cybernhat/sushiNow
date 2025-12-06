package com.example.sushiNow.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "tables")
public class RestaurantTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "is_occupied")
    private boolean isOccupied;
}