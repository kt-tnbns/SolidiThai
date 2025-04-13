import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { PrismaModule } from 'src/services/prisma/prisma.module'
import { AuthService } from 'src/domain/auth/services/auth.service'
import { AuthRepository } from 'src/domain/auth/repositories/auth.repository'
import { UserRepository } from 'src/domain/user/repositories/user.repository'
import { AuthenticationModule } from 'src/authentication/authentication.module'
import { UserMapper } from 'src/domain/user/mappers/user-mapper'

@Module({
  imports: [PrismaModule, AuthenticationModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UserRepository, UserMapper],
})
export class AuthModule {}
