import { IsString, IsNotEmpty, IsInt} from 'class-validator'
export class CreateActionDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string
}

export class UpdateActionDto {
    @IsInt()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string
}