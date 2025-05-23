package com.house.rent.house.rent.controller;

import com.house.rent.house.rent.model.House;
import com.house.rent.house.rent.model.Tenant;
import com.house.rent.house.rent.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/houses")
public class HouseController {

    @Autowired
    private HouseService houseService;

    @PostMapping("/{houseId}/tenants")
    public House assignTenantToHouse(@PathVariable Long houseId, @RequestBody Tenant tenant) {
        House house = houseService.getHouseById(houseId);
        if (house != null) {
            tenant.setHouse(house);
            house.getTenants().add(tenant);
            return houseService.saveHouse(house);
        }
        return null;
    }
}