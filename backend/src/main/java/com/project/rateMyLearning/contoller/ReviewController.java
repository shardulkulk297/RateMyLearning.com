package com.project.rateMyLearning.contoller;

import com.project.rateMyLearning.dto.ReviewDto;
import com.project.rateMyLearning.dto.ReviewerDto;
import com.project.rateMyLearning.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/api/review/add")
    public ResponseEntity<?> postReview(@RequestBody ReviewDto reviewDto, Principal principal){
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.postReview(reviewDto, principal.getName()));
    }



}
