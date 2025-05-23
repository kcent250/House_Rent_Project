package com.house.rent.house.rent.repository;


import com.house.rent.house.rent.model.House;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseRepository extends JpaRepository<House, Long> {
}