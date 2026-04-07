import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<null>) {}

    public async signup(): Promise<string> {
        return "Signup successful";
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
