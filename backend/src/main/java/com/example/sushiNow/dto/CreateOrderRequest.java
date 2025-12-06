package com.example.sushiNow.dto;

import lombok.*;
import java.util.List;

@Data
public class CreateOrderRequest {

    private Long tableId;
    private Long userId;
    private List<Items> items;

    @Data
    public static class Items {

        private Long itemId;
        private String notes;
    }
}
