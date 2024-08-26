import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private cardRepository: Repository<Card>,
    ) { }

    async create(createCardDto: CreateCardDto): Promise<Card> {
        const card = this.cardRepository.create(createCardDto);
        return this.cardRepository.save(card);
    }

    findAll(): Promise<Card[]> {
        return this.cardRepository.find();
    }

    findOne(id: number): Promise<Card> {
        return this.cardRepository.findOneBy({ id });
    }

    async update(id: number, updateCardDto: Partial<CreateCardDto>, userId: number): Promise<Card> {
        const card = await this.findOne(id);

        if (!card) {
            throw new NotFoundException('Card not found.');
        }

        if (card.userId !== userId) {
            throw new ForbiddenException('You do not have permission to update this card.');
        }

        await this.cardRepository.update(id, updateCardDto);
        return this.findOne(id);
    }

    async remove(id: number, userId: number): Promise<void> {
        const card = await this.findOne(id);

        if (!card) {
            throw new NotFoundException('Card not found.');
        }

        if (card.userId !== userId) {
            throw new ForbiddenException('You do not have permission to delete this card.');
        }

        await this.cardRepository.delete(id);
    }
}
