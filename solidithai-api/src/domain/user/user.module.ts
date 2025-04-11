import { Module } from '@nestjs/common'
import { UserRepository } from './repositories/user.repository'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { PrismaModule } from 'src/services/prisma/prisma.module'
import { UserMapper } from 'src/domain/user/mappers/user-mapper'
import { UserValidator } from 'src/domain/user/validators/user.validator'

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository, UserMapper, UserValidator],
  controllers: [UserController],
})
export class UserModule {}
