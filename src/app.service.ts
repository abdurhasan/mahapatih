import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leads, } from 'src/entities';
import { Repository } from 'typeorm';

import * as isEmpty from 'is-empty';
import * as moment from 'moment';

import axios from 'axios';
import { SubmitInput } from './types/submit.input';
import { ConfigService } from './config/config.service';
import { BaseResponse } from './types/base.response';


interface IMessage {
    text: string
}
interface ISendWhatsapp {
    receiver: string;
    message: IMessage
}

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Leads)
        private readonly repo: Repository<Leads>,
        @Inject(ConfigService) private readonly config: ConfigService

    ) { }

    list() {
        return {
            data: this.repo.find()
        }
    }

    async submit({ name, phone }: SubmitInput) {
        const now: number = Number(moment().utcOffset(7).format('HH'));
        let greetings: string = ''
        if (now > 0 && now < 12) greetings = 'Pagi';
        if (now > 12 && now < 15) greetings = 'Siang';
        if (now > 15 && now < 18) greetings = 'Sore';
        if (now > 18) greetings = 'Malam';


        await this.repo.save({ name, phone })
        const params: ISendWhatsapp = {
            receiver: phone,
            message: {
                text: `
                *Hallo , Selamat Malam ${name} .* 
                *Perkenalkan saya Achan,admin dari skalascape.* 

                *Skalascape sendiri adalah konsultan di bidang Arsitektur & Interior* 
                *dari tahap A-Z mulai dari desain - perencanaan - perancangan hingga pembangunan :*
                *✅Jasa Design & Build Interior Apartemen*
                *✅Jasa Design & Build Interior Rumah*
                *✅Jasa Design & Build Interior Kantor*

                *✅Renovasi Rumah*
                *✅Renovasi Taman*
                *✅Renovasi Klinik*
                *✅Makeover Kamar*

                *Untuk informasi lebih detailnya.Barangkali Pak/Bu ${name} lebih nyaman Achan telepon / chat ?*                
                `
            }
        }
        await axios.post<{ data: BaseResponse }>(
            this.config.WA_URL,
            {
                ...params,
            },
        );



    }


}
