package com.project.rateMyLearning.contoller;

import com.project.rateMyLearning.model.User;
import com.project.rateMyLearning.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/user/signup")
    public ResponseEntity<?> signUp(@RequestBody User user){
        return ResponseEntity.status(HttpStatus.OK).body(userService.signUp(user));
    }
}
