import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Voucher } from 'src/entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Voucher])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
