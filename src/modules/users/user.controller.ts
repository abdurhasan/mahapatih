import {
    Body,
    Controller,
    HttpException,
    Inject,
    Post,

} from '@nestjs/common';
import { UserRegisterInput } from './dto/user-register.input';
import { UserService } from './user.service';
import { response, responseError } from '../../helpers'
import { ConfigService } from 'src/config/config.service';
import { UserLoginInput } from './dto/user-login.input';
import { Public } from 'src/guards';
import { AddCustomerServiceInput } from './dto/add-customer-service.input';
import { CurrentUser } from 'src/decorators';
import { User } from 'src/entities';

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
    @Post('voucher')
    async createVoucher(
        @Body() param: { code: string, days: number },
    ) {
        try {
            if (this.config.isProduction) {
                throw new Error('not available')
            }
            return await this.service.createVoucher(param)
        } catch (e) {
            return responseError(e?.message);
        }
    }

    
    @Post('addCustomerService')
    async addCustomerService(
        @Body() param: AddCustomerServiceInput,
        @CurrentUser() user : User
    ) {
        try {
            if (this.config.isProduction) {
                throw new Error('not available')
            }
            // return await this.service.createVoucher(param)
        } catch (e) {
            return responseError(e?.message);
        }
    }




}
