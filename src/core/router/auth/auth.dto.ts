import {IsEmail, IsNotEmpty} from 'class-validator'

export class AuthData {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    passwd: string
}