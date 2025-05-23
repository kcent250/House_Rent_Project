package com.house.rent.house.rent.service;

import com.house.rent.house.rent.model.MaintenanceRequest;
import com.house.rent.house.rent.repository.MaintenanceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceRequestService {

    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    public List<MaintenanceRequest> getAllRequests() {
        return maintenanceRequestRepository.findAll();
    }

    public MaintenanceRequest getRequestById(Long id) {
        return maintenanceRequestRepository.findById(id).orElse(null);
    }

    public List<MaintenanceRequest> getRequestsByHouseId(Long houseId) {
        return maintenanceRequestRepository.findByHouseId(houseId);
    }

    public List<MaintenanceRequest> getRequestsByTenantId(Long tenantId) {
        return maintenanceRequestRepository.findByTenantId(tenantId);
    }

    public MaintenanceRequest saveRequest(MaintenanceRequest request) {
        return maintenanceRequestRepository.save(request);
    }

    public void deleteRequest(Long id) {
        maintenanceRequestRepository.deleteById(id);
    }
}