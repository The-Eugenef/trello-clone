import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { User } from './entities/user.entity';
import { ColumnEntity } from './entities/column.entity';
import { Card } from './entities/card.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'trello_clone',
      entities: [User, ColumnEntity, Card, Comment],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ColumnModule,
    CardModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
