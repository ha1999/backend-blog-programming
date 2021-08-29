import { HttpException } from "@nestjs/common"

export const handlerError = (error: any): void => {
    console.log('Error is ', error.message, '---------------' )
    throw new HttpException(error.message, 500)
}