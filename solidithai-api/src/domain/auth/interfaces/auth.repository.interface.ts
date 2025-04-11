import { User } from '@prisma/client'
import { CreateUserRequestDto } from 'src/domain/user/dto/request/create-user-request.dto'

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<User | null>
  register(user: CreateUserRequestDto): Promise<User>
}
