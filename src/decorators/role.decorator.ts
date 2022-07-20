import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { RoleEnum } from '../types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);
