import { HttpException } from '@nestjs/common';
import { AppEnvirontmentEnum } from '../types';
import { appConfig } from './config.helper';

export interface IResponseParam {
  result?: any | any[];
  statusCode?: number;
  message?: string;
}

export class Response<T> {
  timeStamp: number;
  versionCode: string;
  message: string;
  statusCode: number;
  result: T;

  constructor({ result, statusCode, message }: IResponseParam) {
    this.timeStamp =
      appConfig.APP_ENV === AppEnvirontmentEnum.Test ? 0 : Date.now();
    this.message = message ?? 'success';
    this.statusCode = statusCode ?? 200;
    this.result = result;
  }
}

export const response = (param: IResponseParam): Response<any> =>
  new Response(param);

export const responseError = (
  message: string,
  statusCode = 422,
): Promise<HttpException> =>
  Promise.reject(
    new HttpException(
      { success: false, message: message, statusCode },
      statusCode,
    ),
  );
