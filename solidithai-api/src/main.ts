import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { swaggerConfig } from 'src/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(helmet()) // Adds security headers

  swaggerConfig(app)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
