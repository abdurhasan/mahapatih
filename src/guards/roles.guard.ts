import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entities';
import { ROLES_KEY } from '../decorators';
import { RoleEnum } from '../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: RoleEnum[] = this.reflector.getAllAndOverride<
      RoleEnum[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    const ctx: any = context?.switchToHttp().getRequest();
    const user: User = ctx?.user || ctx?.req?.user;

    if (!requiredRoles.length || user.role.includes(RoleEnum.SuperAdmin)) {
      return true;
    }

    return requiredRoles.some((reqRole) => reqRole === user?.role);
  }
}
