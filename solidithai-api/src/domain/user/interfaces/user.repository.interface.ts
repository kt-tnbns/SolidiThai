import { CreateUserRequestDto } from 'src/domain/user/dto/request/create-user-request.dto'
import { UpdateUserRequestDto } from 'src/domain/user/dto/request/update-user-request.dto'
import { User } from '@prisma/client'

export interface IUserRepository {
  findAll: () => Promise<User[]>
  findOneById: (id: string) => Promise<User>
  findUserByEmail: (email: string) => Promise<User>
  deleteUser: (id: string) => Promise<User>
  createUser: (body: CreateUserRequestDto) => Promise<User>
  updateUser: (id: string, body: UpdateUserRequestDto) => Promise<User>
}
