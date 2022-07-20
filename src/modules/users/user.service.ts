import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Voucher } from 'src/entities';
import { Repository } from 'typeorm';
import { UserRegisterInput } from './dto/user-register.input';
import * as isEmpty from 'is-empty';
import { RoleEnum, BaseResponse } from 'src/types';
import * as moment from 'moment';
import { phoneNumberFormatter } from 'src/helpers';
import { UserLoginInput } from './dto/user-login.input';
import { JwtService } from '@nestjs/jwt';
import { AddCustomerServiceInput } from './dto/add-customer-service.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Voucher)
        private readonly voucherRepo: Repository<Voucher>,
        @Inject(JwtService)
        private readonly jwtService: JwtService,
    ) { }

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
                throw new Error('invalid login')
            }

            return await this.jwtService.signAsync({ ...user });

        } catch (error) {
            throw error;
        }
    }

    async createVoucher(param: { code: string; days: number }) {
        await this.voucherRepo.save({
            ...param,
        });
        return { success: true };
    }

    async addCS(param: AddCustomerServiceInput, { organization, validUntil }: User) {
        try {


            await this.userRepo.save({
                ...param,
                organization,
                role: RoleEnum.User,
                validUntil
            })

            return { success: true }

        } catch (error) {
            throw error;
        }
    }
}
