import { Module } from "@nestjs/common";
import { FileController } from "./file.constroller";
import { FireBaseService } from "./file.service";

@Module({
    controllers: [FileController],
    providers: [FireBaseService]
})

export class FireBaseModule{}