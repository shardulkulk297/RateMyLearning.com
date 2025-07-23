package com.project.rateMyLearning.repository;

import com.project.rateMyLearning.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("Select count(r.id) from Review r WHERE r.reviewer.user.username = ?1")
    int getTotalReviews(String name);
    @Query("Select avg(r.rating) from Review r WHERE r.reviewer.user.username=?1")
    int getAvgRating(String name);
}
