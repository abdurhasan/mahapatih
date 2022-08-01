import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Voucher } from 'src/entities';
import { Repository } from 'typeorm';
import { UserRegisterInput } from './dto/user-register.input';
import * as isEmpty from 'is-empty';
import { RoleEnum, BaseResponse, PaginationInput } from 'src/types';
import * as moment from 'moment';
import { createPaginationOptions } from 'src/helpers';
import { UserLoginInput } from './dto/user-login.input';
import { JwtService } from '@nestjs/jwt';
import { AddCustomerServiceInput } from './dto/add-customer-service.input';
import * as generateVoucher from 'referral-codes';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Voucher)
    private readonly voucherRepo: Repository<Voucher>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async userRegister({
    organization,
    voucherCode,
    ...param
  }: UserRegisterInput): Promise<BaseResponse> {
    try {
      const voucher = await this.voucherRepo.findOne({
        where: { code: voucherCode },
      });
      if (isEmpty(voucher) || !isEmpty(voucher.organization)) {
        throw new Error('voucher is not valid!');
      }

      const adminCompany = await this.userRepo.findOne({
        where: { organization, role: RoleEnum.Management },
      });

      if (!isEmpty(adminCompany)) {
        throw new Error(`${organization} has already admin`);
      }

      await this.userRepo.save({
        ...param,
        organization,
        role: RoleEnum.Management,
        validUntil: moment().add(voucher.days, 'days').endOf('day').toDate(),
      });

      voucher.organization = organization;
      await voucher.save();

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async userLogin({ phone, password }: UserLoginInput): Promise<string> {
    try {
      const user = await this.userRepo.findOne({ where: { phone } });

      if (isEmpty(user) || user.password !== password) {
        throw new Error('invalid login');
      }

      return await this.jwtService.signAsync({ ...user });
    } catch (error) {
      throw error;
    }
  }

  async createVoucher(days: number) {
    try {
      const code = generateVoucher.generate({
        length: 4,
        count: 4,
      });

      await this.voucherRepo.save({
        days,
        code: code.join('-'),
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async addCS(
    { phone, ...param }: AddCustomerServiceInput,
    { organization, validUntil }: User,
  ) {
    try {
      const user = await this.userRepo.findOne({ where: { phone } });
      if (!isEmpty(user)) {
        throw Error(`${phone} ald registered`);
      }
      await this.userRepo.save({
        ...param,
        phone,
        organization,
        role: RoleEnum.User,
        validUntil,
      });

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async getCustomerServices(
    paginationParam: PaginationInput,
    { organization }: User,
  ) {
    try {
      const { limit, offset, page } = createPaginationOptions(paginationParam);

      const [data, total] = await this.userRepo
        .createQueryBuilder('user')
        .where('user.organization = :organization', { organization })
        .andWhere('user.role = :role', { role: RoleEnum.User })
        .orderBy('user.name', 'ASC')
        .limit(limit)
        .offset(offset)
        .getManyAndCount();

      return {
        data,
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }
}
