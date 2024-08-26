import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../entities/column.entity';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnEntity)
        private columnRepository: Repository<ColumnEntity>,
    ) { }

    create(createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
        console.log(createColumnDto)
        const column = this.columnRepository.create(createColumnDto);
        return this.columnRepository.save(column);
    }

    findAll(): Promise<ColumnEntity[]> {
        return this.columnRepository.find();
    }

    async findOne(id: number): Promise<ColumnEntity> {
        return this.columnRepository.findOne({
            where: { id },
            relations: ['user'], // Загружаем связанные данные пользователя
        });
    }

    async update(id: number, updateColumnDto: Partial<CreateColumnDto>, userId: number): Promise<ColumnEntity> {

        const column = await this.findOne(id);

        if (!column) {
            throw new NotFoundException('Column not found.');
        }

        if (column.user.id !== userId) {
            throw new ForbiddenException('You do not have permission to update this column.');
        }

        await this.columnRepository.update(id, updateColumnDto);
        return this.findOne(id);
    }

    async remove(id: number, userId: number): Promise<void> {
        const column = await this.findOne(id);

        if (!column) {
            throw new NotFoundException('Column not found.');
        }

        if (column.user.id !== userId) {
            throw new ForbiddenException('You do not have permission to delete this column.');
        }

        await this.columnRepository.delete(id);
    }
}
