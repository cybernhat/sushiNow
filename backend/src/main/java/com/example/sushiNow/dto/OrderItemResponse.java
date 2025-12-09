package com.example.sushiNow.dto;

import lombok.*;
import java.util.List;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class OrderItemResponse {
    private Long itemId;
    private String name;
    private BigDecimal price;
    private String notes;
}