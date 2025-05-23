package com.house.rent.house.rent.controller;

import com.house.rent.house.rent.model.MaintenanceRequest;
import com.house.rent.house.rent.service.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceRequestController {

    @Autowired
    private MaintenanceRequestService maintenanceRequestService;

    @GetMapping
    public List<MaintenanceRequest> getAllRequests() {
        return maintenanceRequestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public MaintenanceRequest getRequestById(@PathVariable Long id) {
        return maintenanceRequestService.getRequestById(id);
    }

    @GetMapping("/house/{houseId}")
    public List<MaintenanceRequest> getRequestsByHouseId(@PathVariable Long houseId) {
        return maintenanceRequestService.getRequestsByHouseId(houseId);
    }

    @GetMapping("/tenant/{tenantId}")
    public List<MaintenanceRequest> getRequestsByTenantId(@PathVariable Long tenantId) {
        return maintenanceRequestService.getRequestsByTenantId(tenantId);
    }

    @PostMapping
    public MaintenanceRequest createRequest(@RequestBody MaintenanceRequest request) {
        return maintenanceRequestService.saveRequest(request);
    }

    @PutMapping("/{id}")
    public MaintenanceRequest updateRequest(@PathVariable Long id, @RequestBody MaintenanceRequest request) {
        request.setId(id);
        return maintenanceRequestService.saveRequest(request);
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        maintenanceRequestService.deleteRequest(id);
    }
}