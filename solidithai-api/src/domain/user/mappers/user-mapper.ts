import { User } from '@prisma/client'
import { UserDomain } from '../dto/domains/user.domain'
import { plainToInstance } from 'class-transformer'

export class UserMapper {
  toDomain(user: User): UserDomain {
    return plainToInstance(UserDomain, user)
  }

  toDomains(users: User[]): UserDomain[] {
    return plainToInstance(UserDomain, users)
  }
}
