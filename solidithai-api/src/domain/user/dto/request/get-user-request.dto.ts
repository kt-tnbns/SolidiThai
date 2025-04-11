import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class GetUserRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The id of the user',
    example: 'f4f1672a-f57a-44e1-81dd-6a294993095a',
  })
  id?: string
}
