import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserRequestDto } from 'src/domain/user/dto/request/create-user-request.dto'
import { UpdateUserRequestDto } from 'src/domain/user/dto/request/update-user-request.dto'
import { IUserRepository } from 'src/domain/user/interfaces/user.repository.interface'
import { PrismaService } from 'src/services/prisma/prisma.service'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        isDeleted: false,
      },
    })

    return users
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        isDeleted: false,
      },
    })

    return user
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    })

    return user
  }

  async createUser(body: CreateUserRequestDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
      },
    })

    return user
  }

  async updateUser(id: string, body: UpdateUserRequestDto): Promise<User> {
    const { firstName, lastName, email } = body
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
      },
    })

    return user
  }
}
