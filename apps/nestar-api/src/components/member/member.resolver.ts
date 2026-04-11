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

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) {}

    @Mutation(() => Member)
    public async signup(@Args("input") input: MemberInput): Promise<Member> {
        console.log("Mutation: signup");
        return this.memberService.signup(input);
}
    // (1) PIPE + GUARD + INTERCEPTOR.req
    @Mutation(() => Member)
    public async login(@Args("input") input: LoginInput): Promise<Member> {
        console.log("Mutation: login");
        console.log("MVC: Controller");
        
        return this.memberService.login(input);
    }
    // (3) INTERCEPTOR.res

    // Authentication: User, Admin, Agent
    @UseGuards(AuthGuard)
    @Mutation(() => String)
    public async updateMember(@AuthMember('_id') memberId: ObjectId): Promise<string> {    // O'zimiz yozgan custom decorator orqali authMember ma'lumotlarini olish
        console.log("Mutation: updateMember!");
        console.log(typeof memberId);
        console.log("memberId:", memberId);
        return this.memberService.updateMember();
    }

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
        return `Hi ${authMember.memberNick}, you are ${authMember.memberType}!`;
    }


    @Query(() => String)
    public async getMember(): Promise<string> {
        console.log('Query getMember!');
        return this.memberService.getMember();
    }

    /* Admin */

    // Authorization: Admin

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async getAllMembersByAdmin( ): Promise<string> {        
        return this.memberService.getAllMembersByAdmin();
    }

    // Authorization: Admin
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async updateMemberByAdmin(): Promise<string> {
        return this.memberService.updateMemberByAdmin();
    }
}