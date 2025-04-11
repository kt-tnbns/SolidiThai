import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { swaggerConfig } from 'src/swagger.config'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(helmet()) // Adds security headers

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
    }),
  )

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  swaggerConfig(app)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
