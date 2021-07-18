import { IsString, IsNotEmpty, IsInt} from 'class-validator'
export class CreateRoleActionDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsInt()
    @IsNotEmpty()
    action_id: number
}
