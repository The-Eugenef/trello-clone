import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Card]),
        forwardRef(() => AuthModule),
        forwardRef(() => UserModule),
    ],
    providers: [CardService],
    controllers: [CardController],
    exports: [CardService],
})
export class CardModule { }
