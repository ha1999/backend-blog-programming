import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RoleActionService } from '../router/role_action/role.action.service';
import { RequestCustom } from '../type.request.user';

@Injectable()
export class ActionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly roleActionService: RoleActionService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const action = this.reflector.get<number>('action', context.getHandler());
    if (!action) return true;
    const request = context.switchToHttp().getRequest() as RequestCustom;
    const { role } = request.user;
    this.roleActionService
      .checkActionOfRole(role, action)
      .then((data) => (data === 1 ? true : false))
      .catch((error) => {
        throw new UnauthorizedException(
          `Your have\'nt permission!. You have to permission ${action}`,
        );
      });
  }
}
