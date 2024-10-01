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
            console.log("CREATED");
            const createdCourse = await newCourse.save();
            return {statusCode: 200, message: 'Courses created sucssesfully'};
        } catch (error) {
            throw new BadRequestException('Could not create Course');
        }
    }

    async getCourses(page: number, limit: number = 20) {
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
