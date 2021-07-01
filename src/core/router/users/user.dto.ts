import { IsString, IsInt, IsBoolean, IsNotEmpty, IsOptional} from 'class-validator'
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    passwd: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    avatar: string

    @IsOptional()
    @IsBoolean()
    is_active: boolean
}

export class UpdateUserDto {
    @IsInt()
    @IsNotEmpty()
    id: number
    
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsInt()
    lastName: number

    @IsBoolean()
    is_active: boolean
}