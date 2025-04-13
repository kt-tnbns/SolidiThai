import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/authentication/guards/jwt.auth.guard'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { GetListResponse } from 'src/common/types/response'
import { UserContext } from 'src/common/types/user-context'
import { UserDomain } from 'src/domain/user/dto/domains/user.domain'
import { CreateUserRequestDto } from 'src/domain/user/dto/request/create-user-request.dto'
import { GetUsersRequestDto } from 'src/domain/user/dto/request/get-users-request.dto'
import { UpdateUserRequestDto } from 'src/domain/user/dto/request/update-user-request.dto'
import { UserService } from 'src/domain/user/services/user.service'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query() query: GetUsersRequestDto,
  ): Promise<GetListResponse<UserDomain>> {
    return await this.userService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDomain> {
    return await this.userService.findOneById(id)
  }

  @Post()
  async create(
    @Body() body: CreateUserRequestDto,
    @CurrentUser() user: UserContext,
  ): Promise<UserDomain> {
    return await this.userService.createUser(body, user)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserRequestDto,
    @CurrentUser() user: UserContext,
  ): Promise<UserDomain> {
    return await this.userService.updateUser(id, body, user)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserDomain> {
    return await this.userService.deleteUser(id)
  }
}
