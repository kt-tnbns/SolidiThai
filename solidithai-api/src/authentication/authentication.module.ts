import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthGuard } from 'src/authentication/guards/jwt.auth.guard'
import { PrismaModule } from 'src/services/prisma/prisma.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PrismaService } from 'src/services/prisma/prisma.service'

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: Number(configService.get<string>('TOKEN_DURATION')),
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthGuard, JwtStrategy, PrismaService],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthenticationModule {}
