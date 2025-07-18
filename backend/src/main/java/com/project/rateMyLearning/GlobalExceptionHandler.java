package com.project.rateMyLearning;

import com.project.rateMyLearning.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(exception = RuntimeException.class)
    public ResponseEntity<?> RuntimeExceptionHandler(RuntimeException e){

        Map<String, String> map = new HashMap<>();
        map.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
    }

    @ExceptionHandler(exception = ResourceNotFoundException.class)
    public ResponseEntity<?> ResourceNotFoundExceptionHandler(ResourceNotFoundException e){
        Map<String, String> map = new HashMap<>();
        map.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
    }



}