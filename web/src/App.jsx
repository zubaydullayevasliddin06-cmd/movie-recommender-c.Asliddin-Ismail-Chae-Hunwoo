import { useState } from 'react'
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthModal     from './components/AuthModal'
import MoviesPage     from './pages/MoviesPage'
import GamesPage      from './pages/GamesPage'
import AiPage         from './pages/AiPage'
import DiscussionPage from './pages/DiscussionPage'
import HistoryPage    from './pages/HistoryPage'

const PAGES = [
  { id: 'movies',     label: '🎬 Movies'     },
  { id: 'games',      label: '🎮 Games'       },
  { id: 'ai',         label: '✨ AI Match'    },
  { id: 'discussion', label: '💬 Discussion'  },
  { id: 'history',    label: '📋 History'     },
]

function AppInner() {
  const { user, logout } = useAuth()
  const [page, setPage]         = useState('ai')
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-inner">
          <span className="logo">🎬 CINEMATCH</span>
          <nav className="nav">
            {PAGES.map(p => (
              <button
                key={p.id}
                className={`nav-btn${page === p.id ? ' active' : ''}`}
                onClick={() => setPage(p.id)}
              >
                {p.label}
              </button>
            ))}
          </nav>

          <div className="nav-user">
            {user ? (
              <>
                <span className="user-name">👤 {user.username}</span>
                <button className="nav-btn logout-btn" onClick={logout}>Log out</button>
              </>
            ) : (
              <button className="nav-btn login-btn" onClick={() => setShowAuth(true)}>
                Log in
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="page-content">
        {page === 'movies'     && <MoviesPage     />}
        {page === 'games'      && <GamesPage      />}
        {page === 'ai'         && <AiPage         />}
        {page === 'discussion' && <DiscussionPage />}
        {page === 'history'    && <HistoryPage    />}
      </main>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
