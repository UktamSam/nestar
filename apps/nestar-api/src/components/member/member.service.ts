import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { MemberInput } from '../../libs/dto/member/member.input';

@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<Member>) {}

    public async signup(input: MemberInput): Promise<Member> {
        // TO DO: Hash Password
        try {
        const result = await this.memberModel.create(input);
        // TO DO: Auth Token yaratish 
        return result;
        } catch (err) {
           console.log('Error, Service.model:', err);
            throw new BadRequestException(err);
        }
    }

    public async login(): Promise<string> {
        return "Login successful";
    }

    public async updateMember(): Promise<string> {
        return "updateMember successful!";
    }

    public async getMember(): Promise<string> {
        return 'getMember successfull!';
    }

}
