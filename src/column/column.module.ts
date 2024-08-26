import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from '../entities/column.entity';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([ColumnEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),],
    providers: [ColumnService],
    controllers: [ColumnController],
    exports: [ColumnService],
})
export class ColumnModule { }
