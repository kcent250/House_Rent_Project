package com.house.rent.house.rent.controller;

import com.house.rent.house.rent.model.RentalAgreement;
import com.house.rent.house.rent.service.RentalAgreementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agreements")
public class RentalAgreementController {

    @Autowired
    private RentalAgreementService rentalAgreementService;

    @GetMapping
    public List<RentalAgreement> getAllAgreements() {
        return rentalAgreementService.getAllAgreements();
    }

    @GetMapping("/{id}")
    public RentalAgreement getAgreementById(@PathVariable Long id) {
        return rentalAgreementService.getAgreementById(id);
    }

    @GetMapping("/tenant/{tenantId}")
    public List<RentalAgreement> getAgreementsByTenantId(@PathVariable Long tenantId) {
        return rentalAgreementService.getAgreementsByTenantId(tenantId);
    }

    @GetMapping("/house/{houseId}")
    public List<RentalAgreement> getAgreementsByHouseId(@PathVariable Long houseId) {
        return rentalAgreementService.getAgreementsByHouseId(houseId);
    }

    @PostMapping
    public RentalAgreement createAgreement(@RequestBody RentalAgreement agreement) {
        return rentalAgreementService.saveAgreement(agreement);
    }

    @PutMapping("/{id}")
    public RentalAgreement updateAgreement(@PathVariable Long id, @RequestBody RentalAgreement agreement) {
        agreement.setId(id);
        return rentalAgreementService.saveAgreement(agreement);
    }

    @DeleteMapping("/{id}")
    public void deleteAgreement(@PathVariable Long id) {
        rentalAgreementService.deleteAgreement(id);
    }
}