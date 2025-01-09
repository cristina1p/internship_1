import { User } from '@models/users'

export interface DbUser extends User {
  password: string
  createdAt: string // filter users by join date
}

export type SearchableField = keyof Pick<
  DbUser,
  'firstName' | 'lastName' | 'email'
>

export function convertDbUserToUser(dbUser: DbUser): User {
  const { id, email, firstName, lastName, gender, role } = dbUser

  return {
    id,
    email,
    firstName,
    lastName,
    gender,
    role,
  }
}
