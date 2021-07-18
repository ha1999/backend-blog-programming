import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {getConnection} from "typeorm";
import { CreateActionDto, UpdateActionDto } from './action.dto';
import { Action } from './action.entity';

@Injectable()

export class ActionsService {
    constructor(
        @InjectRepository(Action)
        private actionsRepository: Repository<Action>,
    ){}
    
    getPageAction(pageNumber: number, limit: number){
        return this.actionsRepository.findAndCount({
            take: limit ?? 10,
            skip: pageNumber - 1
        })
    }

    createAction(action: CreateActionDto){
        return this.actionsRepository.save(action)
    }

    updateAction({id, name, description}: UpdateActionDto){
        return this.actionsRepository.update({id}, {name, description})
    }

    updateActive(id: number, active: boolean){
        return this.actionsRepository.update({id}, {is_active: active})
    }

    deleteAction(id: number){
        return this.actionsRepository.delete({id})
    }

    bulkCreateActions(actions: CreateActionDto[]){
        return getConnection().transaction(transactionalEntityManager => {
            return transactionalEntityManager
                        .createQueryBuilder()
                        .insert()
                        .into(Action)
                        .values(actions)
                        .execute()
        })
    }

    bulkUpdateActions(actions: UpdateActionDto[]){
        return getConnection().transaction(transactionalEntityManager => {
            return transactionalEntityManager
                        .createQueryBuilder()
                        .insert()
                        .into(Action)
                        .values(actions)
                        .execute()
        })
    }
}