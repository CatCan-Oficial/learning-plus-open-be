import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { JsoncorrectorInterceptor } from './interceptors/jsoncorrector.interceptor';


async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.use(helmet());
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000,
			max: 1000
		})
	);
	app.useGlobalInterceptors(new JsoncorrectorInterceptor());

	const options = new DocumentBuilder()
		.setTitle('Learning Plus')
		.setDescription('Learning Plus API')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.PORT || 5000);
}
bootstrap();
