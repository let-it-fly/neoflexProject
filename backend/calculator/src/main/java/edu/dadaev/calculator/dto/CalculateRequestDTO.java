package edu.dadaev.calculator.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record CalculateRequestDTO(@NotNull @Positive @Digits(integer = 12, fraction = 2) BigDecimal amount,
                                  @NotNull @Positive @Min(1) @Max(60) Integer months,
                                  @NotNull @DecimalMin("1.00") @DecimalMax("20.00") @Digits(integer = 2, fraction = 2) BigDecimal rate) {
}
