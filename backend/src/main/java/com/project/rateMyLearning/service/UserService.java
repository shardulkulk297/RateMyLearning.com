package com.project.rateMyLearning.service;

import com.project.rateMyLearning.dto.ReviewerDto;
import com.project.rateMyLearning.dto.UserDto;
import com.project.rateMyLearning.exception.ResourceNotFoundException;
import com.project.rateMyLearning.model.Reviewer;
import com.project.rateMyLearning.model.User;
import com.project.rateMyLearning.model.enums.Role;
import com.project.rateMyLearning.repository.ReviewerRepository;
import com.project.rateMyLearning.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ReviewerRepository reviewerRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, ReviewerRepository reviewerRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.reviewerRepository = reviewerRepository;
    }

    public User signUp(User user) {
        String password = user.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public Object getLoggedInUserDetails(String username){
        User user = userRepository.getByUsername(username);
        if(user == null){
            throw new ResourceNotFoundException("Invalid Credentials");
        }
        switch(user.getRole()){
            case Role.REVIEWER ->
            {
                Reviewer reviewer = reviewerRepository.getByUsername(username);
                ReviewerDto reviewerDto = new ReviewerDto();
                reviewerDto.setName(reviewer.getName());
                reviewerDto.setId(reviewer.getId());
                reviewerDto.setBio(reviewer.getBio());
                reviewerDto.setProfilePic(reviewer.getProfilePic());
                reviewerDto.setContact(reviewer.getContact());
                reviewerDto.setEmail(reviewer.getEmail());
                reviewerDto.setReputationScore(reviewerDto.getReputationScore());

                UserDto userDto = new UserDto();
                userDto.setId(reviewer.getUser().getId());
                userDto.setUsername(reviewer.getUser().getUsername());
                userDto.setRole(reviewer.getUser().getRole().toString());

                reviewerDto.setUserDto(userDto);

                return reviewerDto;
            }
            default ->{
                return null;
            }
        }
    }
}
