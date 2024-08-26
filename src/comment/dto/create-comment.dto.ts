import { IsString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    text: string;

    @IsInt()
    cardId: number;

    @IsNumber()
    @IsOptional()
    userId?: number;
}
