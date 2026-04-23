import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { ViewService } from '../view/view.service';
import { Model } from 'mongoose';
import { Properties, Property } from '../../libs/dto/property/property';
import { AgentPropertiesInquiry, AllPropertiesInquiry, PropertiesInquiry, PropertyInput } from '../../libs/dto/property/property.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { MemberService } from '../member/member.service';
import { ObjectId } from 'mongoose';
import { PropertyStatus } from '../../libs/enums/property.enum';
import { T, StaticticModifer } from '../../libs/types/common';
import { ViewGroup } from '../../libs/enums/view.enum';
import { PropertyUpdate } from '../../libs/dto/property/property.update';
import moment = require('moment');
import { lookUpMember, shapeIntoMongoObjectId } from '../../libs/config';
import { LikeService } from '../like/like.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';


@Injectable()
export class PropertyService {
        constructor(@InjectModel("Property") private readonly propertyModel: Model<Property>, 
                    private authservice: AuthService,
                    private viewService: ViewService,
                    private memberService: MemberService,
                    private likeService: LikeService,
                ) {}
// -------------------------------------------------------------------------------------------------
public async createProperty(input: PropertyInput): Promise<Property>{
        try {
        const result = await this.propertyModel.create(input);
        // increase memberProperties
        const result1 = await this.memberService.memberStatsEditor({
            _id: result.memberId, 
            targetKey: "memberProperties", 
            modifier: 1,
        })

        return result;
        } catch (err: any) {
           console.log('Error, Service.model:', err.message);
            throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
        }
    }
// -------------------------------------------------------------------------------------------------

public async getProperty(memberId: ObjectId, propertyId: ObjectId): Promise<Property> {
    const search: T = {
        _id: propertyId,
        propertyStatus: PropertyStatus.ACTIVE,
        }

    const targetProperty = await this.propertyModel.findOne(search).lean().exec();
    if (!targetProperty) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

    if (memberId) {
        const viewInput = { memberId: memberId, viewRefId: propertyId, viewGroup: ViewGroup.PROPERTY};
        const newView = await this.viewService.recordView(viewInput);
        if (newView) {
            await this.propertyStatsEditor({_id: propertyId, targetKey: "propertyViews", modifier: 1});
            targetProperty.propertyViews++;
        }

        // me liked
        const likeInput = { memberId: memberId, likeRefId: propertyId, likeGroup: LikeGroup.PROPERTY };
        targetProperty.meLiked = await this.likeService.checkLikeExistence(likeInput);                // men bu propertyga like bosganligimni tekshirish. Bosgan bo'lsam MeLiked[.....]
}
    targetProperty.memberData = await this.memberService.getMember(null, targetProperty.memberId); //null sababi getMember ishlaganda "view++" bo'lmasligi uchun.
    return targetProperty;
    }
// -------------------------------------------------------------------------------------------------

public async updateProperty(input: PropertyUpdate, memberId: ObjectId): Promise<Property> {
    let {propertyStatus, deletedAt, soldAt} = input;
    const search: T = {
        _id: input._id, 
        memberId: memberId,
        propertyStatus: PropertyStatus.ACTIVE
    };

    if (propertyStatus === PropertyStatus.SOLD) input.soldAt = moment().toDate();
    else if (propertyStatus === PropertyStatus.DELETE) input.deletedAt = moment().toDate();

    const result = await this.propertyModel
        .findOneAndUpdate(search, input, {new: true})
        .exec();
    if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

    if (input.soldAt || input.deletedAt) {
        await this.memberService.memberStatsEditor({
            _id: memberId,
            targetKey: "memberProperties",
            modifier: -1,
        });
    }

    return result;
    }
// -------------------------------------------------------------------------------------------------

public async getProperties(memberId: ObjectId, input: PropertiesInquiry): Promise<Properties> {
    const match: T = {propertyStatus: PropertyStatus.ACTIVE};
    const sort: T = {[input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC};

    this.shapeMatchQuery(match, input);
    console.log("match:", match);

    const result = await this.propertyModel
        .aggregate([
            {$match: match},
            {$sort: sort},
            {
                $facet: {
                    list: [
                        {$skip: (input.page - 1) * input.limit}, 
                        {$limit: input.limit},

                        //me liked

                        lookUpMember,
                        { $unwind: '$memberData' },     // $unwind — MongoDB operator. [memberData] => memberData.
                    ],
                    metaCounter: [{$count: 'total'}],
                },
            },
        ])
        .exec();

    if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
    return result[0];
    }
// -------------------------------------------------------------------------------------------------

    private async shapeMatchQuery(match: T, input: PropertiesInquiry): Promise<void> {
        const {
            memberId,
            locationList,
            typeList,
            roomList,
            bedList,
            options,
            priceRange,
            periodsRange,
            squareRange,
            text,
        } = input.search;

        if (memberId) match.memberId = shapeIntoMongoObjectId(memberId);
        if (locationList) match.propertyLocation = {$in: locationList};
        if (typeList) match.propertyType = {$in: typeList};
        if (roomList) match.propertyRooms = {$in: roomList};
        if (bedList) match.propertyBeds = {$in: bedList};

        if (priceRange) match.propertyPrice = {$gte: priceRange.start, $lte: priceRange.end};
        if (periodsRange) match.propertyPeriods = {$gte: periodsRange.start, $lte: periodsRange.end};
        if (squareRange) match.propertySquare = {$gte: squareRange.start, $lte: squareRange.end};

        if (text) match.propertyTitle = {$regex: new RegExp(text, 'i')};

        if (options) {
            match['$or'] = options.map((ele) => {
                return { [ele]: true };
            });
            }
    }
// -------------------------------------------------------------------------------------------------

    public async getAgentProperties(memberId: ObjectId, input: AgentPropertiesInquiry): Promise<Properties> {
        const { propertyStatus } = input.search;
        if ( propertyStatus === PropertyStatus.DELETE) throw new BadRequestException(Message.NOT_ALLOWED_REQUEST);
        
        const match: T = {
            memberId: memberId, 
            propertyStatus: propertyStatus ?? {$ne: PropertyStatus.DELETE}, // DELETE qidirma
        };
        const sort: T = {[input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC};

        const result = await this.propertyModel
            .aggregate([
                {$match: match},
                {$sort: sort},
                {
                    $facet: {
                        list: [
                            {$skip: (input.page - 1) * input.limit}, 
                            {$limit: input.limit},
                            lookUpMember,
                            { $unwind: '$memberData' },
    
                        ],
                        metaCounter: [{$count: 'total'}],
                    },
                },
            ])
            .exec();
            console.log("result:", result);
            
        if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0];
    }
// -------------------------------------------------------------------------------------------------

    public async likeTargetProperty(memberId: ObjectId, likeRefId: ObjectId): Promise<Property> {
        const target: Property = await this.propertyModel.findOne({ _id: likeRefId, propertyStatus: PropertyStatus.ACTIVE }).exec(); // biz bosmoqchi bolgan propertyni tekshirish`
        if (!target) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        const input: LikeInput = {
            memberId: memberId,
            likeRefId: likeRefId,
            likeGroup: LikeGroup.PROPERTY,
        };

        //Like TOGGLE via Like modules
        const modifier: number = await this.likeService.toggleLike(input);
        const result = await this.propertyStatsEditor({_id: likeRefId, targetKey: 'propertyLikes', modifier: modifier});

        if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
        return result;
    }
// -------------------------------------------------------------------------------------------------

    public async getAllPropertiesByAdmin(input: AllPropertiesInquiry): Promise<Properties> {
        const { propertyStatus, propertyLocationList } = input.search;
        const match: T = {};
        const sort: T = {[input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC};

        if (propertyStatus) match.propertyStatus = propertyStatus;
        if (propertyLocationList) match.propertyLocation = {$in: propertyLocationList};

        const result = await this.propertyModel
            .aggregate([
                {$match: match},
                {$sort: sort},
                {
                    $facet: {
                        list: [
                            {$skip: (input.page - 1) * input.limit}, 
                            {$limit: input.limit},
                            lookUpMember,
                            { $unwind: '$memberData' },     // Tepadagi har bitta property uchun memberData'ni joylashtiradi.
                        ],
                        metaCounter: [{$count: 'total'}],
                    },
                },
            ])
            .exec();

        if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0];
    }
// -------------------------------------------------------------------------------------------------

    public async updatePropertyByAdmin(input: PropertyUpdate): Promise<Property> {
        let {propertyStatus, deletedAt, soldAt} = input;

        const search: T = {
            _id: input._id,
            propertyStatus: PropertyStatus.ACTIVE,
        };

        if (propertyStatus === PropertyStatus.SOLD) input.soldAt = moment().toDate();
        else if (propertyStatus === PropertyStatus.DELETE) input.deletedAt = moment().toDate();
        
        const result = await this.propertyModel
            .findOneAndUpdate(search, input, {new: true})
            .exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if (input.soldAt || input.deletedAt) {
            await this.memberService.memberStatsEditor({
                _id: result.memberId,
                targetKey: "memberProperties",
                modifier: -1,
            });
        }

        return result;
    }
// -------------------------------------------------------------------------------------------------

    public async removePropertyByAdmin(propertyId: ObjectId): Promise<Property> {
        const search: T = {
            _id: propertyId,
            propertyStatus: PropertyStatus.DELETE,
        };

        const result = await this.propertyModel.findOneAndDelete(search).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        return result;
    }
// -------------------------------------------------------------------------------------------------

public async propertyStatsEditor(input: StaticticModifer): Promise<Property> {
    const {_id, targetKey, modifier} = input;
    return await this.propertyModel
    .findByIdAndUpdate(
        _id,
        {$inc: {[targetKey]: modifier}},
        {new: true})
    .exec();
}
// -------------------------------------------------------------------------------------------------
}
