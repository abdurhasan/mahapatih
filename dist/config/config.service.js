"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const env_var_1 = require("env-var");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
class ConfigService {
    constructor(processEnv = process.env) {
        this.processEnv = processEnv;
        this.env = (0, env_var_1.from)(this.processEnv);
        this.PORT = this.env.get('PORT').required().asPortNumber();
        this.DB_HOST = this.env
            .get('DB_HOST')
            .required()
            .asString();
        this.DB_PORT = this.env
            .get('DB_PORT')
            .required()
            .asPortNumber();
        this.DB_NAME = this.env
            .get('DB_NAME')
            .required()
            .asString();
        this.DB_USER = this.env
            .get('DB_USER')
            .required()
            .asString();
        this.DB_PASSWORD = this.env
            .get('DB_PASSWORD')
            .required()
            .asString();
        this.WA_URL = this.env.get('WA_URL').required().asString();
        Object.freeze(this);
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map