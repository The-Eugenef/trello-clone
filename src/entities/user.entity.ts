import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { Card } from './card.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @OneToMany(() => ColumnEntity, column => column.user)
  columns: ColumnEntity[];

  @OneToMany(() => Card, card => card.user)
  cards: Card[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
