import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export abstract class IdentifiableTrackableDomain {
  @Expose()
  @ApiProperty({
    type: 'number',
  })
  id: number

  @Expose()
  @ApiProperty({
    example: '2021-08-01T00:00:00.000Z',
    type: 'string',
  })
  createdAt: Date

  @Expose()
  @ApiProperty({
    example: '3bea3b3e-3b3b-3b3b-3b3b-3be3b3b3b3b3',
    type: 'string',
    description: 'The user who created',
  })
  createdBy: string

  @Expose()
  @ApiProperty({
    example: '2021-08-01T00:00:00.000Z',
    type: 'string',
  })
  updatedAt?: Date

  @Expose()
  @ApiProperty({
    example: '3bea3b3e-3b3b-3b3b-3b3b-3be3b3b3b3b3',
    type: 'string',
    description: 'The user who updated',
  })
  updatedBy?: string
}
