package com.house.rent.house.rent.repository;

import com.house.rent.house.rent.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
}