import { User } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { CreateUserRequestDto } from 'src/domain/user/dto/request/create-user-request.dto'
import { UpdateUserRequestDto } from 'src/domain/user/dto/request/update-user-request.dto'

export class AuthMapper {
  toCreateUserDto(user: User): CreateUserRequestDto {
    return plainToInstance(CreateUserRequestDto, user)
  }

  toUpdateUserDto(user: Partial<User>): UpdateUserRequestDto {
    return plainToInstance(UpdateUserRequestDto, user)
  }
}
