package com.project.rateMyLearning.service;

import com.project.rateMyLearning.repository.ReviewRepository;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public int getTotalReviews(String name) {
        return reviewRepository.getTotalReviews(name);
    }

    public int getAvgRating(String name) {
        return reviewRepository.getAvgRating(name);
    }
}
