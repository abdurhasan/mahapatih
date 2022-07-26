import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { UserRegisterInput } from './dto/user-register.input';
import { UserService } from './user.service';
import { response, responseError } from '../../helpers'
import { ConfigService } from 'src/config/config.service';
import { UserLoginInput } from './dto/user-login.input';
import { Public, RolesGuard } from 'src/guards';
import { AddCustomerServiceInput } from './dto/add-customer-service.input';
import { CurrentUser, Roles } from 'src/decorators';
import { User } from 'src/entities';
import { PaginationInput, RoleEnum } from 'src/types';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService)
        private readonly service: UserService,
        private readonly config: ConfigService,

    ) { }

    @Public()
    @Post('register')
    async register(
        @Body() param: UserRegisterInput,
    ) {
        try {
            return response({
                result: await this.service.userRegister(param)
            });
        } catch (e) {
            return responseError(e?.message);
        }
    }

    @Public()
    @Post('login')
    async login(
        @Body() param: UserLoginInput,
    ) {
        try {
            return response({
                result: await this.service.userLogin(param),
            });
        } catch (e) {
            return responseError(e?.message);
        }
    }

    @Public()
    @Post('voucher/:days')
    async createVoucher(
        @Param('days') days: number,
    ) {
        try {
            if (this.config.isProduction) {
                throw new Error('not available')
            }
            return response({ result: await this.service.createVoucher(days) })
        } catch (e) {
            return responseError(e?.message);
        }
    }


    @UseGuards(RolesGuard)
    @Roles(RoleEnum.Management)
    @Post('addCustomerService')
    async addCustomerService(
        @Body() param: AddCustomerServiceInput,
        @CurrentUser() user: User
    ) {
        try {
            return response({ result: await this.service.addCS(param, user) })
        } catch (e) {
            return responseError(e?.message);
        }
    }

    @UseGuards(RolesGuard)
    @Roles(RoleEnum.Management)
    @Get('getCustomerServices')
    async getCustomerServices(
        @Query() paginationParam: PaginationInput,
        @CurrentUser() user: User,
    ) {
        try {
            return response({ result: await this.service.getCustomerServices(paginationParam, user) });
        } catch (e) {
            return responseError(e?.message);
        }
    }




}
