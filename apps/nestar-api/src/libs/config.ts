import { ObjectId } from 'bson';
import { randomUUID } from 'crypto';
import * as path from 'path';

export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberRank', 'memberPoints', 'memberProperties', 'memberArticles', 'memberFollowers', 'memberFollowings', 'memberLikes', 'memberViews'];
export const availableMemberSorts = ['createdAt', 'updatedAt', 'memberPoints', 'memberProperties', 'memberArticles', 'memberFollowers', 'memberFollowings', 'memberLikes', 'memberViews'];

 // IMAGE CONFIGURATION

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/octet-stream'];
export const getSerialForImage = (filename: string) => {
	const ext = path.parse(filename).ext;
    return randomUUID() + ext;
};

export const shapeIntoMongoObjectId = (target: any) => {
    return typeof target === 'string' ? new ObjectId(target) : target;
} 