package com.project.rateMyLearning.service;

import com.project.rateMyLearning.dto.ReviewDto;
import com.project.rateMyLearning.dto.ReviewerDto;
import com.project.rateMyLearning.exception.ResourceNotFoundException;
import com.project.rateMyLearning.model.Course;
import com.project.rateMyLearning.model.Instructor;
import com.project.rateMyLearning.model.Review;
import com.project.rateMyLearning.model.Reviewer;
import com.project.rateMyLearning.repository.ReviewRepository;
import com.project.rateMyLearning.repository.ReviewerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CourseService courseService;
    private final ReviewerService reviewerService;
    private final ReviewerRepository reviewerRepository;

    public ReviewService(ReviewRepository reviewRepository, CourseService courseService, ReviewerService reviewerService, ReviewerRepository reviewerRepository) {
        this.reviewRepository = reviewRepository;
        this.courseService = courseService;
        this.reviewerService = reviewerService;
        this.reviewerRepository = reviewerRepository;
    }

    public int getTotalReviews(String name) {
        return reviewRepository.getTotalReviews(name);
    }

    public int getAvgRating(String name) {
        return reviewRepository.getAvgRating(name);
    }

    public ReviewDto postReview(ReviewDto reviewDto, String username){
        Reviewer reviewer = reviewerRepository.getByUsername(username);
        Review review = reviewDto.getReview();
        review.setReviewer(reviewer);
        Course course = reviewDto.getCourse();

        ReviewDto reviewDto1 = new ReviewDto();
        course = courseService.addCourse(course);
        review.setCourse(course);
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
