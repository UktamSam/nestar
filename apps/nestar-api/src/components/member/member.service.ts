import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Message } from '../../libs/enums/common.enum';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<Member>, 
                private authservice: AuthService,) {}

    public async signup(input: MemberInput): Promise<Member> {
        input.memberPassword = await this.authservice.hasshPassword(input.memberPassword);
        try {
        const result = await this.memberModel.create(input);

        result.accessToken = await this.authservice.createToken(result); // token yaratish va uni result ga saqlash, keyinchalik login qilganda tekshirish uchun
        console.log("accessToken:", result.accessToken);
        
        return result;
        } catch (err: any) {
           console.log('Error, Service.model:', err.message);
            throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
        }
    }

    public async login(input: LoginInput): Promise<Member> {
        const { memberNick, memberPassword } = input;
        console.log("MVC: Service: ", input);
        const response = await this.memberModel
            .findOne({ memberNick: memberNick})
            .select("+memberPassword")
            .exec();

    // (2) Schema
        if (!response || response.memberStatus === MemberStatus.DELETE) {
            throw new InternalServerErrorException(Message.NO_MEMBER_NICK);
        } else if (response.memberStatus === MemberStatus.BLOCK) {
            throw new InternalServerErrorException(Message.BLOCKED_USER);
        }

        // TO DO: compare password
        const isMatch = await this.authservice.comparePassword(memberPassword, response.memberPassword);
        if (!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD);

        response.accessToken = await this.authservice.createToken(response); // token yaratish va uni response ga saqlash, keyinchalik tekshirish uchun
        
        return response;
    }

    public async updateMember(): Promise<string> {
        return "updateMember successful!";
    }

    public async getMember(): Promise<string> {
        return 'getMember successfull!';
    }

    public async getAllMembers(): Promise<string> {
        return "getAllMembers successful!";
    }

    public async updateMemberByAdmin(): Promise<string> {
        return 'updateMemberByAdmin successfull!';
    }


}
