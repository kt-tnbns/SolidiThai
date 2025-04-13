import { CreateUserRequestDto } from 'src/domain/user/dto/request/create-user-request.dto'
import { UpdateUserRequestDto } from 'src/domain/user/dto/request/update-user-request.dto'
import { User } from '@prisma/client'
import { GetUsersRequestDto } from 'src/domain/user/dto/request/get-users-request.dto'
import { PaginatedResult } from 'src/services/paginator/paginator'
import { UserContext } from 'src/common/types/user-context'

export interface IUserRepository {
  findAll: (query: GetUsersRequestDto) => Promise<PaginatedResult<User>>
  findOneById: (id: string) => Promise<User>
  findUserByEmail: (email: string) => Promise<User>
  deleteUser: (id: string) => Promise<User>
  createUser: (
    body: CreateUserRequestDto,
    currentUser: UserContext,
  ) => Promise<User>
  updateUser: (
    id: string,
    body: UpdateUserRequestDto,
    currentUser: UserContext,
  ) => Promise<User>
}
