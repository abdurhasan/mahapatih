"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const typeorm_2 = require("typeorm");
const moment = require("moment");
const axios_1 = require("axios");
const config_service_1 = require("./config/config.service");
let AppService = class AppService {
    constructor(repo, config) {
        this.repo = repo;
        this.config = config;
    }
    list() {
        return {
            data: this.repo.find()
        };
    }
    async submit({ name, phone }) {
        const now = Number(moment().utcOffset(7).format('HH'));
        let greetings = '';
        if (now > 0 && now < 12)
            greetings = 'Pagi';
        if (now > 12 && now < 15)
            greetings = 'Siang';
        if (now > 15 && now < 18)
            greetings = 'Sore';
        if (now > 18)
            greetings = 'Malam';
        await this.repo.save({ name, phone });
        const params = {
            receiver: phone,
            message: {
                text: `
                *Hallo , Selamat Malam ${name} .* 
                *Perkenalkan saya admin dari skalascape.* 

                *Skalascape sendiri adalah konsultan di bidang Arsitektur & Interior* 
                *dari tahap A-Z mulai dari desain - perencanaan - perancangan hingga pembangunan :*
                *✅Jasa Design & Build Interior Apartemen*
                *✅Jasa Design & Build Interior Rumah*
                *✅Jasa Design & Build Interior Kantor*

                *✅Renovasi Rumah*
                *✅Renovasi Taman*
                *✅Renovasi Klinik*
                *✅Makeover Kamar*

                *Untuk informasi lebih detailnya.Barangkali Pak/Bu ${name} lebih nyaman saya telepon / chat ?*                
                `
            }
        };
        await axios_1.default.post(this.config.WA_URL, Object.assign({}, params));
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Leads)),
    __param(1, (0, common_1.Inject)(config_service_1.ConfigService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_service_1.ConfigService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map