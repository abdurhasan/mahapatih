"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const env = app.get(config_service_1.ConfigService);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(env.PORT);
    common_1.Logger.debug(`[APPS] running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map