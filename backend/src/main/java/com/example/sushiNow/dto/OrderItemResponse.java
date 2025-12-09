package com.example.sushiNow.dto;

import lombok.*;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderItemResponse {
    private Long itemId;
    private String name;
    private String notes;
}