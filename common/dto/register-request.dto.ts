import { IsEmail, Length } from "class-validator";

export class RegisterRequestDTO {
    @IsEmail()
    email: string;

    @Length(3, 20)
    name: string;

    @Length(3, 20)
    surname: string;

    @Length(5, 20)
    password: string;
}
