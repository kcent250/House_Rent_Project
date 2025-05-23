package com.house.rent.house.rent.service;

import com.house.rent.house.rent.model.RentalAgreement;
import com.house.rent.house.rent.repository.RentalAgreementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentalAgreementService {

    @Autowired
    private RentalAgreementRepository rentalAgreementRepository;

    public List<RentalAgreement> getAllAgreements() {
        return rentalAgreementRepository.findAll();
    }

    public RentalAgreement getAgreementById(Long id) {
        return rentalAgreementRepository.findById(id).orElse(null);
    }

    public List<RentalAgreement> getAgreementsByTenantId(Long tenantId) {
        return rentalAgreementRepository.findByTenantId(tenantId);
    }

    public List<RentalAgreement> getAgreementsByHouseId(Long houseId) {
        return rentalAgreementRepository.findByHouseId(houseId);
    }

    public RentalAgreement saveAgreement(RentalAgreement agreement) {
        return rentalAgreementRepository.save(agreement);
    }

    public void deleteAgreement(Long id) {
        rentalAgreementRepository.deleteById(id);
    }
}