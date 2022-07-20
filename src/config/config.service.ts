import { from } from 'env-var';
import { config } from 'dotenv';
import { AppEnvirontmentEnum } from '../types';

config({ path: '.env' });

export class ConfigService {
  public constructor(private processEnv = process.env) {
    Object.freeze(this);
  }

  private env = from(this.processEnv);

  public readonly APP_PORT: number = this.env
    .get('APP_PORT')
    .required()
    .asPortNumber();

  public readonly APP_ENV: AppEnvirontmentEnum = this.env
    .get('NODE_ENV')
    .default(AppEnvirontmentEnum.Development)
    .asEnum(Object.values(AppEnvirontmentEnum));

  public readonly DB_HOST: string = this.env
    .get('DB_HOST')
    .required()
    .asString();

  public readonly DB_PORT: number = this.env
    .get('DB_PORT')
    .required()
    .asPortNumber();

  public readonly DB_NAME: string = this.env
    .get('DB_NAME')
    .required()
    .asString();

  public readonly DB_USER: string = this.env
    .get('DB_USER')
    .required()
    .asString();

  public readonly DB_PASSWORD: string = this.env
    .get('DB_PASSWORD')
    .required()
    .asString();

  public readonly JWT_SECRET_KEY: string = this.env
    .get('JWT_SECRET_KEY')
    .required()
    .asString();

  public readonly isProduction: boolean =
    this.APP_ENV === AppEnvirontmentEnum.Production;
  public readonly APP_NAME: string = 'MahapatihApp';
}
