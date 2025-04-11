import { ApiResponseProperty } from '@nestjs/swagger'

export class GetListResponse<T = any> {
  @ApiResponseProperty()
  items: T[]

  @ApiResponseProperty()
  total: number
}
