import { Field, ObjectType } from "@nestjs/graphql";
import type { ObjectId } from 'mongodb';
import { ViewGroup } from "../../enums/view.enum";



@ObjectType()           //DTO 
export class View {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => ViewGroup)
    viewGroup: ViewGroup;

    @Field(() => String)
    viewRefId: ObjectId;

    @Field(() => String)
    memberId: ObjectId;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;    

    @Field(() => String, { nullable: true })
    accessToken?: string;        
}