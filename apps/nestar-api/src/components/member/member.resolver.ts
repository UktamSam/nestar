import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { MemberType } from '../../libs/enums/member.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) {}

    @Mutation(() => Member)
    public async signup(@Args("input") input: MemberInput): Promise<Member> {
        console.log("Mutation: signup");
        return await this.memberService.signup(input);
    }

    // (1) PIPE + GUARD + INTERCEPTOR.req
    @Mutation(() => Member)
    public async login(@Args("input") input: LoginInput): Promise<Member> {
        console.log("Mutation: login");
        console.log("MVC: Controller");
        
        return await this.memberService.login(input);
    }
    // (3) INTERCEPTOR.res

    @UseGuards(AuthGuard)
    @Mutation(() => String)
    public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {    // O'zimiz yozgan custom decorator orqali authMember ma'lumotlarini olish
        console.log("Mutation: checkAuth!");
        return `Hi ${memberNick}, you are authenticated!`;
    }

    @Roles(MemberType.USER, MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async checkAuthRoles(@AuthMember() authMember: Member): Promise<string> {    // O'zimiz yozgan custom decorator orqali authMember ma'lumotlarini olish
        console.log("Mutation: checkAuthRoles!");
        console.log("memberId:", authMember._id);
        
        return `Hi ${authMember.memberNick}, you are ${authMember.memberType} and your id is ${authMember._id}!`;
    }

    // Authentication: User, Admin, Agent
    @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async updateMember(
        @Args('input') input: MemberUpdate,
        @AuthMember('_id') memberId: ObjectId
    ): Promise<Member> {    // O'zimiz yozgan custom decorator orqali authMember ma'lumotlarini olish
        console.log("Mutation: updateMember!");
        delete input._id;
        return await this.memberService.updateMember(memberId, input);
    }

    @Query(() => Member)
    public async getMember(@Args("memberId") input: string): Promise<Member> {
        console.log('Query getMember!');
        const targetId = shapeIntoMongoObjectId(input);
        return await this.memberService.getMember(targetId);
    }

    /* Admin */

    // Authorization: Admin

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async getAllMembersByAdmin( ): Promise<string> {        
        return await this.memberService.getAllMembersByAdmin();
    }

    // Authorization: Admin
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async updateMemberByAdmin(): Promise<string> {
        return this.memberService.updateMemberByAdmin();
    }
}