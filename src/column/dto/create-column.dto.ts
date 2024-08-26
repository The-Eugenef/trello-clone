import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
    @IsString()
    title: string;

    @IsNumber()
    @IsOptional()
    userId?: number;
    
}
