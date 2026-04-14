import { ObjectId } from 'bson';

export const shapeIntoMongoObjectId = (target: any) => {
    return typeof target === 'string' ? new ObjectId(target) : target;
} 

export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberRank', 'memberPoints', 'memberProperties', 'memberArticles', 'memberFollowers', 'memberFollowings', 'memberLikes', 'memberViews'];
export const availableMemberSorts = ['createdAt', 'updatedAt', 'memberPoints', 'memberProperties', 'memberArticles', 'memberFollowers', 'memberFollowings', 'memberLikes', 'memberViews'];