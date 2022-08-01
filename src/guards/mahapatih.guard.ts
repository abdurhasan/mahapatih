import {
  ExecutionContext,
  Injectable,
  SetMetadata,
  CustomDecorator,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as isEmpty from 'is-empty';
import { HttpException } from '@nestjs/common';

const IS_PUBLIC_KEY = 'isPublic';
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class MahapatihGuard {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context?.switchToHttp().getRequest();
    const token: string = request.headers?.authorization?.replace(
      'Bearer ',
      '',
    );

    try {
      if (isEmpty(token)) {
        throw new Error('UNAUTHORIZED');
      }

      /* eslint-disable camelcase */
      request.user = await this.jwtService.verifyAsync(token);

      return true;
    } catch (err) {
      Logger.error(err?.message, err?.stack, '[WorkiGuard]');

      throw new HttpException(
        { message: err?.message, success: false, statusCode: 401 },
        401,
      );
    }
  }
}
