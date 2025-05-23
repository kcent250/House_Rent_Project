package com.house.rent.house.rent.repository;

import com.house.rent.house.rent.model.RentalAgreement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RentalAgreementRepository extends JpaRepository<RentalAgreement, Long> {
    List<RentalAgreement> findByTenantId(Long tenantId);
    List<RentalAgreement> findByHouseId(Long houseId);
}