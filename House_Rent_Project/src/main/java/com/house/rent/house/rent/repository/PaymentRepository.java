package com.house.rent.house.rent.repository;

import com.house.rent.house.rent.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByRentalAgreementId(Long rentalAgreementId);
}