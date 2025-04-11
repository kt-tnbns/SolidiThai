import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'

@Injectable()
export class UserValidator {
  validateUser(user: User) {
    if (!user) {
      throw new NotFoundException('User not found')
    }
  }
}
