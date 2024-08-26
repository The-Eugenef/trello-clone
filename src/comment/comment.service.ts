import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ) { }

    async create(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
        const comment = this.commentRepository.create({ ...createCommentDto, userId });
        return this.commentRepository.save(comment);
    }

    async findAll(): Promise<Comment[]> {
        return this.commentRepository.find();
    }

    async findOne(id: number): Promise<Comment> {
        return this.commentRepository.findOneBy({ id });
    }

    async update(id: number, updateCommentDto: Partial<CreateCommentDto>, userId: number): Promise<Comment> {
        const comment = await this.findOne(id);

        if (!comment) {
            throw new NotFoundException('Comment not found.');
        }

        if (comment.userId !== userId) {
            throw new ForbiddenException('You do not have permission to update this comment.');
        }

        await this.commentRepository.update(id, updateCommentDto);
        return this.findOne(id);
    }

    async remove(id: number, userId: number): Promise<void> {
        const comment = await this.findOne(id);

        if (!comment) {
            throw new NotFoundException('Comment not found.');
        }

        if (comment.userId !== userId) {
            throw new ForbiddenException('You do not have permission to delete this comment.');
        }

        await this.commentRepository.delete(id);
    }
}
