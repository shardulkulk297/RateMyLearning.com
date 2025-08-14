package com.project.rateMyLearning.service;

import com.project.rateMyLearning.dto.ReviewDto;
import com.project.rateMyLearning.dto.ReviewerDto;
import com.project.rateMyLearning.exception.ResourceNotFoundException;
import com.project.rateMyLearning.model.Course;
import com.project.rateMyLearning.model.Review;
import com.project.rateMyLearning.repository.ReviewRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CourseService courseService;
    private final ReviewerService reviewerService;

    public ReviewService(ReviewRepository reviewRepository, CourseService courseService, ReviewerService reviewerService) {
        this.reviewRepository = reviewRepository;
        this.courseService = courseService;
        this.reviewerService = reviewerService;
    }

    public int getTotalReviews(String name) {
        return reviewRepository.getTotalReviews(name);
    }

    public int getAvgRating(String name) {
        return reviewRepository.getAvgRating(name);
    }

    public ReviewDto postReview(ReviewDto reviewDto){
        Review review = reviewDto.getReview();
        Course course = reviewDto.getCourse();

        ReviewDto reviewDto1 = new ReviewDto();

        course = courseService.addCourse(course);
        review = reviewRepository.save(review);

        reviewDto1.setReview(review);
        reviewDto1.setCourse(course);

        return reviewDto1;
    }

    public void deleteReview(int reviewId){
        Review review = reviewRepository.findById(reviewId).orElseThrow(()->new ResourceNotFoundException("Review Not Found"));
        reviewRepository.delete(review);
    }

//    public ReviewDto updateReview(Review review){
//        if(review.getReviewer())
//        {
//
//        }
//    }
}
