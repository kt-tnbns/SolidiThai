import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { RegisterDto } from 'src/domain/auth/dto/register.dto'
import { IAuthRepository } from 'src/domain/auth/interfaces/auth.repository.interface'
import { PrismaService } from 'src/services/prisma/prisma.service'
@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  async register(user: RegisterDto): Promise<User> {
    return this.prisma.user.create({
      data: user,
    })
  }
}
