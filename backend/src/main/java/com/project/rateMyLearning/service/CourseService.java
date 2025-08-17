package com.project.rateMyLearning.service;

import com.project.rateMyLearning.model.Course;
import com.project.rateMyLearning.model.Instructor;
import com.project.rateMyLearning.repository.CourseRepository;
import com.project.rateMyLearning.repository.InstructorRepository;
import org.springframework.stereotype.Service;

@Service
public class CourseService {


    private final CourseRepository courseRepository;
    private final InstructorRepository instructorRepository;

    public CourseService(CourseRepository courseRepository, InstructorRepository instructorRepository) {
        this.courseRepository = courseRepository;
        this.instructorRepository = instructorRepository;
    }

    public Course addCourse(Course course) {
        Instructor instructor = course.getInstructor();
        instructor = instructorRepository.save(instructor);
        course.setInstructor(instructor);
        return courseRepository.save(course);
    }
}
