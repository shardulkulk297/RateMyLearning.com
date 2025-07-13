package com.project.rateMyLearning.service;

import com.project.rateMyLearning.model.User;
import com.project.rateMyLearning.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User signUp(User user) {
        return userRepository.save(user);
    }
}
