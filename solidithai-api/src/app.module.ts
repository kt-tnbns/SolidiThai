import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from 'src/domain/user/user.module'
import { AuthModule } from 'src/domain/auth/auth.module'
import { AuthenticationModule } from 'src/authentication/authentication.module'
import { ConfigModule } from '@nestjs/config'
import { JsonBodyMiddleware } from 'src/common/middlewares/json-body.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JsonBodyMiddleware).forRoutes('*')
  }
}
