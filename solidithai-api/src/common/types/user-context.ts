import { User } from '@prisma/client'

export type UserContext = Pick<User, 'id' | 'email'>
