import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'
import { hashPassword } from 'src/common/utils/hash'
import { Transform } from 'class-transformer'
export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @Transform(({ value }) => hashPassword(value))
  password: string
}
