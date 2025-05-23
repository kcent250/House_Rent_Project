package com.house.rent.house.rent.service;

    import com.house.rent.house.rent.model.House;
    import com.house.rent.house.rent.repository.HouseRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class HouseService {

        @Autowired
        private HouseRepository houseRepository;

        public List<House> getAllHouses() {
            return houseRepository.findAll();
        }

        public House getHouseById(Long id) {
            return houseRepository.findById(id).orElse(null);
        }

        public House saveHouse(House house) {
            return houseRepository.save(house);
        }

        public void deleteHouse(Long id) {
            houseRepository.deleteById(id);
        }

}
