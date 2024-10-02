import { Prop, Schema , SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Course {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    instructor: string;

    @Prop({required: true})
    schedule: string;

}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.index({ title: 'text' });
