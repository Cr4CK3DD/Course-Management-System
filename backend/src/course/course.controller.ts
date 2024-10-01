import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/CreateUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {}


    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createCourse(@Body() createCourseDto: CreateCourseDto) {
        const response = await this.courseService.createCourse(createCourseDto);
        return response; 
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getCourses(@Query('page') page: number = 1) {
        const availableCourses = await this.courseService.getCourses(page)
        return availableCourses;
    }

}
