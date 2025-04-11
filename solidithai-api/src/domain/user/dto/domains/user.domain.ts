import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IdentifiableTrackableDomain } from 'src/common/bases/identifiable-trackable.domain'

export class UserDomain extends IdentifiableTrackableDomain {
  constructor(props: Partial<UserDomain>) {
    super()

    Object.assign(this, props)
  }

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @Expose()
  email: string

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @Expose()
  firstName: string

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @Expose()
  lastName: string
}
