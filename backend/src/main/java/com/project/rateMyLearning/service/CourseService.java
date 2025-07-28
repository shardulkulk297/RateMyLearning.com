package com.project.rateMyLearning.service;

import com.project.rateMyLearning.model.Course;
import com.project.rateMyLearning.repository.CourseRepository;
import org.springframework.stereotype.Service;

@Service
public class CourseService {


    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }
}
