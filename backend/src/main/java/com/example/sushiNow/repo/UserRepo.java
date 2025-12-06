package com.example.sushiNow.repo;

import com.example.sushiNow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

}