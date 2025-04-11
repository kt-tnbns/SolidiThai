import { IsNotEmpty } from 'class-validator'
import { IsString } from 'class-validator'
import { LoginDto } from './login.dto'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string
}
