import { UserDomain } from 'src/domain/user/dto/domains/user.domain'

export type ResetPasswordBody = {
  email: string
  newPassword: string
  token: string
}

export type AuthResponse = {
  user: UserDomain
  accessToken: string
}
