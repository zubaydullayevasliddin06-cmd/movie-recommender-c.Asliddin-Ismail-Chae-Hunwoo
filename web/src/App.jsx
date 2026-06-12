import { useState } from 'react'
import './App.css'
import MoviesPage from './pages/MoviesPage'
import GamesPage  from './pages/GamesPage'
import AiPage     from './pages/AiPage'

const PAGES = [
  { id: 'movies', label: '🎬 Movies' },
  { id: 'games',  label: '🎮 Games'  },
  { id: 'ai',     label: '✨ AI Match' },
]

export default function App() {
  const [page, setPage] = useState('ai')

  return (
    <div className="app">
      {/* Top navigation bar */}
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
        </div>
      </header>

      {/* Page content */}
      <main className="page-content">
        {page === 'movies' && <MoviesPage />}
        {page === 'games'  && <GamesPage  />}
        {page === 'ai'     && <AiPage     />}
      </main>
    </div>
  )
}
