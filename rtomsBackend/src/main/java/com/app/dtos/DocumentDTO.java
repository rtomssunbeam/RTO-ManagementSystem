package com.app.dtos;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDTO {

//    @NotNull(message = "Profile photo is required")
    private MultipartFile profilePhoto;

//    @NotNull(message = "Educational document is required")
    private MultipartFile educationalDocument;

//    @NotNull(message = "Address proof is required")
    private MultipartFile addressProof;
}
