package com.example.Stock.auth.Repository;

import java.util.Optional;

import com.example.Stock.auth.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

}
