import { BadRequestException, Injectable } from '@nestjs/common'
import { LoginDto } from '../dto/login.dto'
import { AuthRepository } from '../repositories/auth.repository'
import { AuthResponse } from '../types/auth.type'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { DecodedOneTimeToken } from 'src/authentication/types/auth-provider'
import { UserMapper } from 'src/domain/user/mappers/user-mapper'

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userMapper: UserMapper,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<AuthResponse> {
    const user = await this.authRepository.findUserByEmail(body.email)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    if (user.password !== body.password) {
      throw new BadRequestException('Invalid password')
    }

    const accessToken = await this.createAccessToken(user)

    return {
      user: this.userMapper.toDomain(user),
      accessToken,
    }
  }

  async getMetadata(token: string): Promise<AuthResponse> {
    try {
      const decoded = await this.jwtService.verifyAsync<DecodedOneTimeToken>(
        token.replace('Bearer ', ''),
      )

      const user = await this.authRepository.findUserByEmail(decoded.email)

      const accessToken = await this.createAccessToken(user)

      return {
        user: this.userMapper.toDomain(user),
        accessToken,
      }
    } catch {
      throw new BadRequestException('Failed to get user metadata')
    }
  }

  private async createAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email }

    return this.jwtService.signAsync(payload)
  }
}
