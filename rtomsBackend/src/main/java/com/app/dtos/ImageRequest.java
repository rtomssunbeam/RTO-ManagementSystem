package com.app.dtos;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public class ImageRequest {
    private String textData;
    private List<MultipartFile> images;

    public String getTextData() {
        return textData;
    }

    public void setTextData(String textData) {
        this.textData = textData;
    }

    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }
}
