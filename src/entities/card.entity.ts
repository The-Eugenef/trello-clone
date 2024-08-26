import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    columnId: number;

    @ManyToOne(() => ColumnEntity, column => column.cards)
    @JoinColumn({ name: 'columnId' })
    column: ColumnEntity;

    @OneToMany(() => Comment, comment => comment.card)
    comments: Comment[];

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.cards)
    @JoinColumn({ name: 'userId' })
    user: User;
}
