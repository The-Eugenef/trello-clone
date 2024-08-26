import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Card } from './card.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    cardId: number;

    @ManyToOne(() => Card, card => card.comments)
    @JoinColumn({ name: 'cardId' })
    card: Card;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'userId' })
    user: User;
}
