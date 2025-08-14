package com.project.rateMyLearning.dto;

import com.project.rateMyLearning.model.Course;
import com.project.rateMyLearning.model.Instructor;
import com.project.rateMyLearning.model.Review;
import com.project.rateMyLearning.model.enums.Pricemodel;
import org.springframework.stereotype.Component;

@Component
public class ReviewDto {

    private Course course;
    private Review review;
    private Instructor instructor;

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public Instructor getInstructor() {
        return instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }
}
