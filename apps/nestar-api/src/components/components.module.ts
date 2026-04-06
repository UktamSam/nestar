import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PropertyModule } from './property/property.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [
    MemberModule, 
    PropertyModule, 
    CommentModule, 
    AuthModule, 
    LikeModule, 
    ViewModule, 
    FollowModule]
})
export class ComponentsModule {}
