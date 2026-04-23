import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
import { Member, Members } from '../../libs/dto/member/member';
import { BadRequestException, InternalServerErrorException, UnsupportedMediaTypeException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { MemberType } from '../../libs/enums/member.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { getSerialForImage, shapeIntoMongoObjectId, validMimeTypes } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Message } from '../../libs/enums/common.enum';



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

    // AUTHORIZATION
    @Roles(MemberType.USER, MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async checkAuthRoles(@AuthMember() authMember: Member): Promise<string> {    // O'zimiz yozgan custom decorator orqali authMember ma'lumotlarini olish
        console.log("Mutation: checkAuthRoles!");
        console.log("memberId:", authMember._id);
        
        return `Hi ${authMember.memberNick}, you are ${authMember.memberType} and your id is ${authMember._id}!`;
    }

    // Authentication
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

    // RETRIEVER
    @UseGuards(WithoutGuard)
    @Query(() => Member)
    public async getMember(
        @Args("memberId") input: string,
        @AuthMember('_id') memberId: ObjectId
    ): Promise<Member> {
        console.log('Query getMember!');
        console.log("memberId:", memberId);
        const targetId = shapeIntoMongoObjectId(input);
        return await this.memberService.getMember(memberId, targetId);
    }

    @UseGuards(WithoutGuard)
    @Query(() => Members)
    public async getAgents(@Args('input') input: AgentsInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Members> {
        console.log('Query getAgents!');
        return await this.memberService.getAgents(memberId, input);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async likeTargetMember(
        @Args('memberId') input: string, 
        @AuthMember('_id') memberId: ObjectId
    ): Promise<Member> {
        console.log('Mutation likeTargetMember!');
        const likeRefId = shapeIntoMongoObjectId(input);
        return await this.memberService.likeTargetMember(memberId, likeRefId);
    }
    /* Admin */

    // Authorization: Admin

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Query(() => Members)
    public async getAllMembersByAdmin(@Args('input') input: MembersInquiry): Promise<Members> {        
        console.log('Query getAllMembersByAdmin!');
        return await this.memberService.getAllMembersByAdmin(input);
    }

    // Authorization: Admin
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Member)
    public async updateMemberByAdmin(@Args('input') input: MemberUpdate): Promise<Member> {
        console.log('Mutation updateMemberByAdmin!');
        return this.memberService.updateMemberByAdmin(input);
    }


    /* UPLOADER */
@UseGuards(AuthGuard)
@Mutation((returns) => String)
public async imageUploader(
	@Args({ name: 'file', type: () => GraphQLUpload })
{ createReadStream, filename, mimetype }: FileUpload,
@Args('target') target: String,
): Promise<string> {
	console.log('Mutation: imageUploader');
    console.log('filename:', filename);
    console.log('mimetype:', mimetype);  // <-- добавь это
    console.log('validMimeTypes:', validMimeTypes);


	if (!filename) throw new BadRequestException(Message.UPLOAD_FAILED);
const validMime = validMimeTypes.includes(mimetype);
if (!validMime) throw new UnsupportedMediaTypeException(Message.PROVIDE_ALLOWED_FORMAT);

const imageName = getSerialForImage(filename);
const url = `uploads/${target}/${imageName}`;
const stream = createReadStream();              //читает файл по кускам, не загружая его целиком в память.

const result = await new Promise((resolve, reject) => {
	stream
		.pipe(createWriteStream(url))
		.on('finish', async () => resolve(true))
		.on('error', () => reject(false));
});
if (!result) throw new InternalServerErrorException(Message.UPLOAD_FAILED);

return url;
}

@UseGuards(AuthGuard)
@Mutation((returns) => [String])
public async imagesUploader(
	@Args('files', { type: () => [GraphQLUpload] })
files: Promise<FileUpload>[],
@Args('target') target: String,
): Promise<string[]> {
	console.log('Mutation: imagesUploader');

	const uploadedImages = [];
	const promisedList = files.map(async (img: Promise<FileUpload>, index: number): Promise<Promise<void>> => {
		try {
            // Bu mantiq faqat error berganlarni qoldiradi. Boshqa mantiq: bitta file'da error bo'lsa hammasiga Error;
			const { filename, mimetype, encoding, createReadStream } = await img;

			const validMime = validMimeTypes.includes(mimetype);
			if (!validMime) throw new UnsupportedMediaTypeException(Message.PROVIDE_ALLOWED_FORMAT);

			const imageName = getSerialForImage(filename);
			const url = `uploads/${target}/${imageName}`;
			const stream = createReadStream();

			const result = await new Promise((resolve, reject) => {
				stream
					.pipe(createWriteStream(url))
					.on('finish', () => resolve(true))
					.on('error', () => reject(false));
			});
			if (!result) throw new InternalServerErrorException(Message.UPLOAD_FAILED);

			uploadedImages[index] = url;
		} catch (err) {
			console.log('Error, file missing!');
		}
	});

	await Promise.all(promisedList);
	return uploadedImages;
}

}