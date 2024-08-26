import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @MinLength(2)
    username: string;

    @IsString()
    token: string;
}
