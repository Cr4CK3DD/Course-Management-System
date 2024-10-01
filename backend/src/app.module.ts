import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
