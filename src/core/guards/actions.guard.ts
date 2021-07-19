
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { RoleActionService } from '../router/role_action/role.action.service'

@Injectable()
export class ActionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject('RoleActionService') private readonly roleActionService: RoleActionService
        ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const action = this.reflector.get<number>('action', context.getHandler())
        if(!action) return true
        const request = context.switchToHttp().getRequest() as Request
        const role = request.headers.authorization
        this.roleActionService
        .checkActionOfRole(role, action)
        .then(data => (data === 1 ? true: false))
        .catch(() => {
            throw new UnauthorizedException('Your have\'nt permission!', 'Forbidden')
        })
    }
}
