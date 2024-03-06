package com.app.entities;
import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Document extends BaseEntity {

    @Lob
    @Column(name = "profile_photo")
    private byte[] profilePhoto;

    @Lob
    @Column(name = "educational_document")
    private byte[] educationalDocument;

    @Lob
    @Column(name = "address_proof")
    private byte[] addressProof;

}
