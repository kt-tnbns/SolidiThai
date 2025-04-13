import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { UserContext } from 'src/common/types/user-context'
import { CreateUserRequestDto } from 'src/domain/user/dto/request/create-user-request.dto'
import { GetUsersRequestDto } from 'src/domain/user/dto/request/get-users-request.dto'
import { UpdateUserRequestDto } from 'src/domain/user/dto/request/update-user-request.dto'
import { IUserRepository } from 'src/domain/user/interfaces/user.repository.interface'
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from 'src/services/paginator/paginator'
import { PrismaService } from 'src/services/prisma/prisma.service'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyWithPagination({
    model,
    where,
    orderBy,
    page,
    perPage,
  }: {
    model: Prisma.UserDelegate
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
    page?: number
    perPage?: number
  }): Promise<PaginatedResult<User>> {
    const paginate: PaginateFunction = paginator({ perPage })

    return paginate(
      model,
      {
        where,
        orderBy,
      },
      {
        page,
      },
    )
  }

  async findAll(query: GetUsersRequestDto): Promise<PaginatedResult<User>> {
    const { keyword, page, limit, sortBy, sortOrder } = query

    const users = await this.findManyWithPagination({
      model: this.prisma.user,
      where: {
        isDeleted: false,
        ...(keyword && {
          OR: [
            { firstName: { contains: keyword, mode: 'insensitive' } },
            { lastName: { contains: keyword, mode: 'insensitive' } },
            { email: { contains: keyword, mode: 'insensitive' } },
          ],
        }),
      },

      orderBy: { [sortBy]: sortOrder },
      page,
      perPage: limit,
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

  async createUser(
    body: CreateUserRequestDto,
    currentUser: UserContext,
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
      },
    })

    return user
  }

  async updateUser(
    id: string,
    body: UpdateUserRequestDto,
    currentUser: UserContext,
  ): Promise<User> {
    const { firstName, lastName, email } = body
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        updatedBy: currentUser.id,
      },
    })

    return user
  }
}
