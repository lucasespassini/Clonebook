import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { User } from './modules/users/entities/user.entity';
import { Post } from './modules/posts/entities/post.entity';
import { Comment } from './modules/comments/entities/comment.entity';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersController } from './modules/users/users.controller';
import { PostsController } from './modules/posts/posts.controller';
import { CommentsController } from './modules/comments/comments.controller';
import { FriendsModule } from './modules/friends/friends.module';
import { Friend } from './modules/friends/entities/friend.entity';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    CommentsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.13.250',
      port: 3306,
      username: 'lucas.mendes',
      password: 'Nq9N868y2rMReZGv73gu',
      database: 'treinamento',
      entities: [User, Post, Comment, Friend],
      synchronize: true,
    }),
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'user/login',
          method: RequestMethod.POST,
        },
        {
          path: 'user',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(
        AppController,
        UsersController,
        PostsController,
        CommentsController,
      );
  }
}
