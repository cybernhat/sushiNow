package com.example.sushiNow.dto;

import lombok.Data;

@Data 
public class UpdateOrderStatusRequest {
    private Long userId;
    private String status;
}