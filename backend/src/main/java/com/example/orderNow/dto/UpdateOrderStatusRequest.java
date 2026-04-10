package com.example.orderNow.dto;

import lombok.Data;

@Data 
public class UpdateOrderStatusRequest {
    private Long userId;
    private String status;
}

//stuff 