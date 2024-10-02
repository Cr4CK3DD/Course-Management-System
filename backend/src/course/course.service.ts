import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/schemas/Course.schema';
import { CreateCourseDto } from './dto/CreateUser.dto'

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<Course>
    )
    {}

    async createCourse(createCourseDto: CreateCourseDto){
        try {
            const newCourse = new this.courseModel(createCourseDto);

            const createdCourse = await newCourse.save();
            return {statusCode: 200, message: 'Courses created sucssesfully'};
        } catch (error) {
            throw new BadRequestException('Could not create Course');
        }
    }

    async getCourseByTitle(title: string) {
        try {
            const course = await this.courseModel.findOne({ title }).exec();

            if (!course) {
                throw new BadRequestException('Course not found');
            }
    
            return {
                statusCode: 200,
                data: {
                    title: course.title,
                    description: course.description,
                    instructor: course.instructor,
                    schedule: course.schedule,
                },
            };
        } catch (error) {
            throw new BadRequestException('Could not fetch the course');
        }
    }
    
    async getCoursesByInstructor(instructor: string) {
        try {
            const course = await this.courseModel.findOne({ instructor }).exec();

            if (!course) {
                throw new BadRequestException('Course not found');
            }

            return {
                statusCode: 200,
                data: {
                    title: course.title,
                    description: course.description,
                    instructor: course.instructor,
                    schedule: course.schedule,
                },
            };
        } catch (error) {
            throw new BadRequestException('Could not fetch courses for the instructor');
        }
    }
    

    async getCourses(page: number, limit: number = 16) {
        try {
            const skip = (page - 1) * limit; 
            const courses = await this.courseModel
                .find()
                .skip(skip) 
                .limit(limit) 
                .exec();

            const totalCourses = await this.courseModel.countDocuments();
            return {
                statusCode: 200,
                data: courses,
                totalPages: Math.ceil(totalCourses / limit),
                currentPage: page,
                totalCourses: totalCourses
            };
        } catch (error) {
            throw new BadRequestException('Could not fetch courses');
        }
    }
    
}
