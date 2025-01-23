export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem('token', token)
}

export function getTokenFromLocalStorage(): string {
  return localStorage.getItem('token') || ''
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem('token')
}
