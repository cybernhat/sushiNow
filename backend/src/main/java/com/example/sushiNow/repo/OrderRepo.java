package com.example.sushiNow.repo;

import com.example.sushiNow.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order, Long> {

    List<Order> findByStatus(String status);

    List<Order> findByTableIdAndStatusIn(Long tableId, List<String> statuses);

}
