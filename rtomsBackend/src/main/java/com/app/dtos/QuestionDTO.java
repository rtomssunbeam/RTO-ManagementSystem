package com.app.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import com.app.enums.CorrectOption; // Import the CorrectOption enum


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class QuestionDTO {
	
	@NotBlank(message = "Question text is required")
	@Size(max = 255, message = "Question text must be at most 255 characters")
    private String questionText;
	
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    
    
    // Using enum for correctness
       private CorrectOption correctOption;

  
   // @Pattern(regexp = "[ABCD]", message = "Correct option must be one of: A, B, C, D")
   // private String correctOption;

}
