import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { MahapatihGuard } from './guards';
import { ConfigService } from './config/config.service';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule,
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.JWT_SECRET_KEY,
          signOptions: { expiresIn: '6h' },
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: MahapatihGuard,
    },
  ]
})
export class AppModule { }
