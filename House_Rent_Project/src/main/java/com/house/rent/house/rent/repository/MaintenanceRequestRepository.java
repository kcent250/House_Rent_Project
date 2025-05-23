package com.house.rent.house.rent.repository;

import com.house.rent.house.rent.model.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
    List<MaintenanceRequest> findByHouseId(Long houseId);
    List<MaintenanceRequest> findByTenantId(Long tenantId);
}