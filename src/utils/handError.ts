import { HttpException } from "@nestjs/common"

export const handlerError = (error: any): void => {
    console.log(error.message, error)
    throw new HttpException(error.message, 500)
}