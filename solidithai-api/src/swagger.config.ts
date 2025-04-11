import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function swaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('SolidiThai API')
    .setDescription('SolidiThai API Documentation')
    .addBearerAuth()
    .addBasicAuth()
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
}
