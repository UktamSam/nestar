import { forwardRef, Module } from '@nestjs/common';
import { BoardArticleService } from './board-article.service';
import { MongooseModule } from '@nestjs/mongoose';
import BoardArticleSchema from '../../schemas/BoardArticle.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { ViewModule } from '../view/view.module';
import { CommentModule } from '../comment/comment.module';
import { LikeModule } from '../like/like.module';
import { BoardArticleResolver } from './board-article.resolver';


@Module({
  imports: [ 
    MongooseModule.forFeature([
        {
          name: "BoardArticle", 
          schema: BoardArticleSchema}
        ]), 
    AuthModule,
    MemberModule,
    ViewModule,
    LikeModule,
    ],  // boardArticle Schema model'ni hosil qilyabmiz
  providers: [BoardArticleService, BoardArticleResolver],
  exports: [BoardArticleService]
})
export class BoardArticleModule {}
