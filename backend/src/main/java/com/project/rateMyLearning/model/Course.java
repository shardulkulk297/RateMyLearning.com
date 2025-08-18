package com.project.rateMyLearning.model;

import com.project.rateMyLearning.model.enums.Difficulty;
import com.project.rateMyLearning.model.enums.Pricemodel;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String platform;
    private String thumbnailUrl;
    private LocalDate publishedDate;
    private int videoCount;
    private String typeOfCourse;
    @Enumerated(EnumType.STRING) private Pricemodel priceModel;
    @Enumerated(EnumType.STRING) private Difficulty difficulty;
    private String isCertification;
    private int durationMinutes;
    private String language;
    private String averageRating;
    @ManyToOne
    private Instructor instructor;

    public Instructor getInstructor() {
        return instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public int getId() {
        return id;
    }

    public int getVideoCount() {
        return videoCount;
    }

    public void setVideoCount(int videoCount) {
        this.videoCount = videoCount;
    }

    public String getTypeOfCourse() {
        return typeOfCourse;
    }

    public void setTypeOfCourse(String typeOfCourse) {
        this.typeOfCourse = typeOfCourse;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public LocalDate getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
    }

    public Pricemodel getPriceModel() {
        return priceModel;
    }

    public void setPriceModel(Pricemodel priceModel) {
        this.priceModel = priceModel;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public String getIsCertification() {
        return isCertification;
    }

    public void setIsCertification(String isCertification) {
        this.isCertification = isCertification;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(String averageRating) {
        this.averageRating = averageRating;
    }
}
