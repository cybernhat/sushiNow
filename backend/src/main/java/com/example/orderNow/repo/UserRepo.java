package com.example.orderNow.repo;

import com.example.orderNow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

}