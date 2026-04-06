package com.example.orderNow.repo;

import com.example.orderNow.model.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantTableRepo extends JpaRepository<RestaurantTable, Long> {

}
