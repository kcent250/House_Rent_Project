package com.house.rent.house.rent.service;

import com.house.rent.house.rent.model.Payment;
import com.house.rent.house.rent.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public List<Payment> getPaymentsByRentalAgreementId(Long rentalAgreementId) {
        return paymentRepository.findByRentalAgreementId(rentalAgreementId);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}