import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Member } from '../../libs/dto/member/member';
import { T } from '../../libs/types/common';
import { JwtService } from '@nestjs/jwt';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Injectable()
export class AuthService {
    constructor (private jwtService: JwtService) {}

    public async hasshPassword(memberPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(memberPassword, salt);
    }

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public async createToken(member: Member): Promise<string> {
        console.log('member:', member);
        const payload: T = {}; // payload ichida memberNick yoki memberId bo'lishi mumkin, bu token ichida saqlanadi va keyinchalik tekshiriladi
        
        Object.keys(member['_doc'] ? member['_doc'] : member).map((ele) => {
            payload[`${ele}`] = member[`${ele}`];
        });
        delete payload.memberPassword; // token ichida password bo'lishi shart emas, xavfsizlik uchun uni o'chirib tashlaymiz
        console.log('payload:', payload);

        return await this.jwtService.signAsync(payload); 
    }

    public async verifyToken(token: string): Promise<Member> {
        const member = await this.jwtService.verifyAsync(token); // здесь мы получаем данные из токена, которые были сохранены при его создании
        member._id = shapeIntoMongoObjectId(member._id); // token ichidagi _id'ни String -> ObjectId formatiga.
        return member;
    }
}