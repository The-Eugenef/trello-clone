import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateCardDto {
    @IsString()
    title: string;


    @IsInt()
    columnId: number;

    @IsNumber()
    @IsOptional()
    userId?: number;
}
