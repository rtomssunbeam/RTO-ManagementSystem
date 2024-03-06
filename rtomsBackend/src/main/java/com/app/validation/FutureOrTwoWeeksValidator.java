package com.app.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class FutureOrTwoWeeksValidator implements ConstraintValidator<FutureOrTwoWeeks, LocalDate> {

    @Override
    public void initialize(FutureOrTwoWeeks constraintAnnotation) {
    }

    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // Let @NotNull handle null checks
        }

        LocalDate twoWeeksFromNow = LocalDate.now().plusWeeks(2);
        return value.isAfter(LocalDate.now()) && value.isBefore(twoWeeksFromNow);
    }
}
