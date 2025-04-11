import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { hashPassword } from 'src/common/utils/hash'
import { UpdateUserRequestDto } from 'src/domain/user/dto/request/update-user-request.dto'
import { Transform } from 'class-transformer'

export class CreateUserRequestDto extends UpdateUserRequestDto {
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => hashPassword(value))
  password: string
}
