import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leads } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Leads      
    ]),
    ConfigModule,
    DatabaseModule,
  ],
  providers: [
    AppService
  ],
  controllers: [
    AppController
  ]
})
export class AppModule { }
