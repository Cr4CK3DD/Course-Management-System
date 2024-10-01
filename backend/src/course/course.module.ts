import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schemas/Course.schema';
import { CourseController } from './course.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Course.name,
    schema: CourseSchema
  }]),
    AuthModule
  ],
  providers: [CourseService],
  controllers: [CourseController]
})
export class CourseModule {}
