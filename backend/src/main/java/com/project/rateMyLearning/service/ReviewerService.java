package com.project.rateMyLearning.service;

import com.project.rateMyLearning.exception.ResourceNotFoundException;
import com.project.rateMyLearning.model.Review;
import com.project.rateMyLearning.model.Reviewer;
import com.project.rateMyLearning.model.User;
import com.project.rateMyLearning.model.enums.Role;
import com.project.rateMyLearning.repository.ReviewerRepository;
import com.project.rateMyLearning.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class ReviewerService {
    private final UserService userService;
    private final UserRepository userRepository;
    private final ReviewerRepository reviewerRepository;

    public ReviewerService(UserService userService, UserRepository userRepository, ReviewerRepository reviewerRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.reviewerRepository = reviewerRepository;
    }

    public Reviewer addReviewer(Reviewer reviewer) {
        User check = userRepository.getByUsername(reviewer.getUser().getUsername());
        if(check!=null){
            throw new RuntimeException("Username Already Exists");
        }
        Reviewer check2 = reviewerRepository.getReviewerByEmail(reviewer.getEmail());
        if(check2!=null){
            throw new RuntimeException("User with this email already exists");
        }
        User user = reviewer.getUser();
        user.setRole(Role.REVIEWER);
        user = userService.signUp(user);
        reviewer.setUser(user);
        reviewer.setReputationScore(1);
        return reviewerRepository.save(reviewer);
    }

    public Reviewer deleteReviewer(String username){
        Reviewer reviewer = reviewerRepository.getByUsername(username);
        if(reviewer == null){
            throw new RuntimeException("User Not Found");
        }
        reviewerRepository.delete(reviewer);
        return reviewer;
    }

    public Reviewer uploadLogoSignUp(int id, MultipartFile file) throws IOException {
        Reviewer reviewer = reviewerRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Reviewer Not found"));
        /*
        Getting Original Name
         */
        String originalFileName = file.getOriginalFilename();
        /*
        Extracting Extension
         */
        String extension = originalFileName.split("\\.")[1];
        /*
        Checking whether the extension is valid or not
         */
        if (!(List.of("jpg", "jpeg", "png", "gif", "svg").contains(extension.toLowerCase()))){
            throw new RuntimeException("File Extension " + extension + " not allowed " + "Allowed Extensions"
                    + List.of("jpg", "jpeg", "png", "gif", "svg"));
        }

        /*
        Checking if the directory exists else create one
         */
        String uploadFolder = "D:\\My Codes\\My Projects\\RateMyLearning.com\\public\\images";
        Files.createDirectories(Path.of(uploadFolder));
        /*
        Define Full Path
         */
        Path path = Paths.get(uploadFolder, "\\", originalFileName);
        /*
        Upload file in mentioned Path, if already exisitng replace existing
         */
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        reviewer.setProfilePic(originalFileName);
        Reviewer savedCustomer =  reviewerRepository.save(reviewer);
        User user = savedCustomer.getUser();

        return reviewer;
    }


}
