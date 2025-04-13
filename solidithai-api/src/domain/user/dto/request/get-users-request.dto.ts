import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class GetUsersRequestDto {
  @IsOptional()
  @IsString()
  keyword?: string

  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number

  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number

  @IsOptional()
  @IsString()
  sortBy?: string

  @IsOptional()
  @IsString()
  sortOrder?: string
}
