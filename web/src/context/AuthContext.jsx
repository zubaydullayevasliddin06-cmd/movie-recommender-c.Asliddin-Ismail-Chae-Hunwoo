/* AuthContext.jsx
   Global auth state. Any component can call useAuth() to get the current user
   and the login / logout / register helpers. */

import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(() => {
    const raw = localStorage.getItem('cinematch_user')
    return raw ? JSON.parse(raw) : null
  })

  const persist = useCallback((userData) => {
    if (userData) {
      localStorage.setItem('cinematch_user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('cinematch_user')
    }
    setUser(userData)
  }, [])

  async function register(username, password) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Registration failed.')
    persist(data)
    return data
  }

  async function login(username, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed.')
    persist(data)
    return data
  }

  function logout() {
    persist(null)
  }

  /* Attach the Bearer token to any fetch headers automatically. */
  function authHeader() {
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {}
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, authHeader }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
