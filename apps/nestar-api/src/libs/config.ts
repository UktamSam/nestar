import { ObjectId } from 'bson';
import { randomUUID } from 'crypto';
import * as path from 'path';
import { T } from './types/common';
import { pipeline } from 'stream';

export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberRank', 'memberPoints', 'memberProperties', 'memberArticles', 'memberFollowers', 'memberFollowings', 'memberLikes', 'memberViews'];
export const availableMemberSorts = ['createdAt', 'updatedAt', 'memberPoints', 'memberProperties', 'memberArticles', 'memberFollowers', 'memberFollowings', 'memberLikes', 'memberViews'];
export const availableBoardArticleSorts = ['createdAt', 'updatedAt', 'articleLikes', 'articleViews'];
export const availableCommentSorts = ['createdAt', 'updatedAt'];
export const availablePropertySortes = [
    'createdAt', 
    'updatedAt', 
    'propertyViews', 
    'propertyLikes', 
    'propertyRank', 
    'propertyPrice', 
];
export const availableOptions = ['propertyBarter', 'propertyRent'];


 // IMAGE CONFIGURATION
export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/octet-stream'];
export const getSerialForImage = (filename: string) => {
	const ext = path.parse(filename).ext;
    return randomUUID() + ext;
};

export const shapeIntoMongoObjectId = (target: any) => {
    return typeof target === 'string' ? new ObjectId(target) : target;
} 

export const lookupAuthMemberLiked = (memberId: T, targetRefId: string = '$_id') => {
  return {
    $lookup: {
      from: 'likes',
      let: {
        localLikeRefId: targetRefId,
        localMemberId: memberId,
        localMyFavorite: true,
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$likeRefId', '$$localLikeRefId'] },
                { $eq: ['$memberId', '$$localMemberId'] },
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            memberId: 1,
            likeRefId: 1,
            myFavorite: '$$localMyFavorite',
          },
        },
      ],
      as: 'meLiked',
    },
  };
};

export const lookUpMember = {
    $lookup: {
        from: 'members',
        localField: 'memberId',
        foreignField: '_id',
        as: 'memberData',
    },
}

export const lookupFollowingData = {
    $lookup: {
        from: 'members',
        localField: 'followingId',
        foreignField: '_id',
        as: 'followingData',
    },
};

export const lookupFollowerData = {
    $lookup: {
        from: 'members',
        localField: 'followerId',
        foreignField: '_id',
        as: 'followerData',
    }
}