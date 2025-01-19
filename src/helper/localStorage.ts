import { User } from '@models/users'

export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem('token', token)
}

export function getTokenFromLocalStorage(): string {
  return localStorage.getItem('token') || ''
}

export function saveUserToLocalStorage(userDetails: User) {
  localStorage.setItem('userDetails', JSON.stringify(userDetails))
}

export function getUserFromLocalStorage() {
  try {
    const userDetailsString = localStorage.getItem('userDetails')

    if (!userDetailsString) {
      return undefined
    }

    return JSON.parse(userDetailsString) as User
  } catch (error) {
    console.error('Error parsing localStorage data:', error)
  }
}
