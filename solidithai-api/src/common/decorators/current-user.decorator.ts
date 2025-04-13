import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { UserContext } from 'src/common/types/user-context'

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    const user: UserContext = request.user

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user as UserContext
  },
)
