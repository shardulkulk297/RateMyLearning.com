package com.project.rateMyLearning.repository;

import com.project.rateMyLearning.model.Reviewer;
import com.project.rateMyLearning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewerRepository extends JpaRepository<Reviewer, Integer> {
    @Query("Select r from Reviewer r WHERE r.email = ?1")
    Reviewer getReviewerByEmail(String email);

    List<Reviewer> user(User user);
    @Query("Select u from Reviewer u WHERE u.user.username = ?1")
    Reviewer getByUsername(String username);
}
