package com.project.rateMyLearning.contoller;

import com.project.rateMyLearning.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin("http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/api/review/getTotalReviews")
    public ResponseEntity<?> getTotalReviews(Principal principal){
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.getTotalReviews(principal.getName()));
    }

    @GetMapping("/api/review/getAvgRating")
    public ResponseEntity<?> getAvgRating(Principal principal){
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.getAvgRating(principal.getName()));
    }

}
