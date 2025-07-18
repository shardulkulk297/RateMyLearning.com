package com.project.rateMyLearning.contoller;

import com.project.rateMyLearning.model.Reviewer;
import com.project.rateMyLearning.service.ReviewerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin("http://localhost:5173")
public class ReviewerController {

    private final ReviewerService reviewerService;

    public ReviewerController(ReviewerService reviewerService) {
        this.reviewerService = reviewerService;
    }

    @PostMapping("/api/reviewer/add")
    public ResponseEntity<?> addReviewer(@RequestBody Reviewer reviewer){
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewerService.addReviewer(reviewer));
    }

    @PostMapping("/api/reviewer/profile/upload/{reviewerId}")
    public ResponseEntity<?> uploadProfile(@PathVariable int reviewerId, @RequestParam MultipartFile file) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(reviewerService.uploadLogoSignUp(reviewerId, file));
    }

}
