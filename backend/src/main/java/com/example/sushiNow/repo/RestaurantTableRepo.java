package com.example.sushiNow.repo;

import com.example.sushiNow.model.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantTableRepo extends JpaRepository<RestaurantTable, Long> {

}
