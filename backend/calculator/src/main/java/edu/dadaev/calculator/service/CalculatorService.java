package edu.dadaev.calculator.service;

import edu.dadaev.calculator.dto.CalculateRequestDTO;
import edu.dadaev.calculator.dto.CalculateResponseDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CalculatorService {
    private final BigDecimal TWELVE_HUNDRED = BigDecimal.valueOf(1200);


    public CalculateResponseDTO calculate(CalculateRequestDTO requestDTO){
        Integer months = requestDTO.months();
        BigDecimal amount = requestDTO.amount();
        BigDecimal rate = requestDTO.rate();


        BigDecimal total = rate
                .divide(TWELVE_HUNDRED, 10, RoundingMode.HALF_EVEN)
                .add(BigDecimal.ONE)
                .pow(months)
                .multiply(amount)
                .setScale(2, RoundingMode.HALF_EVEN);

        BigDecimal profit = total.subtract(amount);

        return new CalculateResponseDTO(total, profit);
    }

}
