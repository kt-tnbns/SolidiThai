import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { GetListResponse } from 'src/common/types/response'
import { UserContext } from 'src/common/types/user-context'
import { UserDomain } from 'src/domain/user/dto/domains/user.domain'
import { CreateUserRequestDto } from 'src/domain/user/dto/request/create-user-request.dto'
import { GetUsersRequestDto } from 'src/domain/user/dto/request/get-users-request.dto'
import { UpdateUserRequestDto } from 'src/domain/user/dto/request/update-user-request.dto'
import { UserMapper } from 'src/domain/user/mappers/user-mapper'
import { UserRepository } from 'src/domain/user/repositories/user.repository'
import { UserValidator } from 'src/domain/user/validators/user.validator'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
    private readonly userValidator: UserValidator,
  ) {}

  async findAll(
    query: GetUsersRequestDto,
  ): Promise<GetListResponse<UserDomain>> {
    try {
      const users = await this.userRepository.findAll(query)
      const mappedUsers = this.userMapper.toDomains(users.data)
      return {
        items: mappedUsers,
        total: users.meta.total,
      }
    } catch (error) {
      throw error
    }
  }

  async findOneById(id: string): Promise<UserDomain> {
    try {
      const user = await this.userRepository.findOneById(id)
      this.userValidator.validateUser(user)
      return this.userMapper.toDomain(user)
    } catch (error) {
      throw error
    }
  }

  async createUser(
    body: CreateUserRequestDto,
    currentUser: UserContext,
  ): Promise<UserDomain> {
    const existingUser = await this.userRepository.findUserByEmail(body.email)

    if (existingUser) {
      throw new BadRequestException('User already exists')
    }

    const user = await this.userRepository.createUser(body, currentUser)
    return this.userMapper.toDomain(user)
  }

  async deleteUser(id: string): Promise<UserDomain> {
    try {
      const user = await this.findOneById(id)
      if (!user) {
        throw new NotFoundException('User not found')
      }

      const deletedUser = await this.userRepository.deleteUser(id)

      return this.userMapper.toDomain(deletedUser)
    } catch (error) {
      throw error
    }
  }

  async updateUser(
    id: string,
    body: UpdateUserRequestDto,
    currentUser: UserContext,
  ): Promise<UserDomain> {
    try {
      const user = await this.findOneById(id)
      if (!user) {
        throw new NotFoundException('User not found')
      }

      const updatedUser = await this.userRepository.updateUser(
        id,
        body,
        currentUser,
      )
      return this.userMapper.toDomain(updatedUser)
    } catch (error) {
      throw error
    }
  }
}
