import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common'
import { LoginDto } from '../dto/login.dto'
import { RegisterDto } from '../dto/register.dto'
import { AuthService } from '../services/auth.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthResponse } from 'src/domain/auth/types/auth.type'
import { JwtAuthGuard } from 'src/authentication/guards/jwt.auth.guard'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() body: LoginDto): Promise<AuthResponse> {
    return this.authService.login(body)
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  async register(@Body() body: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(body)
  }

  @Get('metadata')
  @ApiOperation({ summary: 'Get metadata' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMetadata(
    @Headers('authorization') token: string,
  ): Promise<AuthResponse> {
    return this.authService.getMetadata(token)
  }
}
