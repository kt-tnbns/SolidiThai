import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthGuard } from 'src/authentication/guards/jwt.auth.guard'
import { PrismaModule } from 'src/services/prisma/prisma.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<number>('TOKEN_DURATION') * 1000,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthenticationModule {}
