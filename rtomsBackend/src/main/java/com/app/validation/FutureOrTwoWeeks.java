package com.app.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FutureOrTwoWeeksValidator.class)
public @interface FutureOrTwoWeeks {

    String message() default "Date must be within the next two weeks";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
