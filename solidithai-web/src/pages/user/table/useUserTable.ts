import { User } from "../../../types/auth"

export const useUserTable = () => {
  return {
    userTable: [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
      },
    ] as User[]
  }
}
