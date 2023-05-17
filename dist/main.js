"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const interceptor_1 = require("./interceptors/interceptor");
const http_exception_filter_1 = require("./exceptions/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalInterceptors(new interceptor_1.GeneralInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        disableErrorMessages: false,
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Nest.js example')
        .setDescription('The nest.js API description')
        .setVersion('1.0')
        .addTag('nestjs')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(4100);
}
bootstrap();
//# sourceMappingURL=main.js.map