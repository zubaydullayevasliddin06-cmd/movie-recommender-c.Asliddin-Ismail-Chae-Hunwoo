/* HistoryPage.jsx
   Shows the logged-in user's past AI recommendations, newest first. */

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './HistoryPage.css'

export default function HistoryPage() {
  const { user, authHeader } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }

    fetch('/api/history', { headers: authHeader() })
      .then(r => r.json())
      .then(data => setHistory(Array.isArray(data) ? data : []))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) {
    return (
      <div className="history-empty">
        <div className="history-icon">🔒</div>
        <h2>Log in to see your history</h2>
        <p>Your past AI recommendations will appear here once you have an account.</p>
      </div>
    )
  }

  if (loading) {
    return <div className="history-loading">Loading history…</div>
  }

  if (history.length === 0) {
    return (
      <div className="history-empty">
        <div className="history-icon">🎬</div>
        <h2>No history yet</h2>
        <p>Go to ✨ AI Match, describe your mood, and your picks will be saved here automatically.</p>
      </div>
    )
  }

  return (
    <div className="history-page">
      <h1 className="history-title">Your Picks, {user.username}</h1>
      <p className="history-subtitle">{history.length} recommendation{history.length !== 1 ? 's' : ''} saved</p>

      <div className="history-list">
        {history.map((item, i) => (
          <div key={i} className="history-card">
            <div className="history-badge">{item.type === 'Game' ? '🎮' : '🎬'}</div>
            <div className="history-info">
              <div className="history-name">{item.title} <span className="history-year">({item.year})</span></div>
              <div className="history-mood">"{item.mood_input}"</div>
              {item.explanation && (
                <p className="history-explain">{item.explanation}</p>
              )}
            </div>
            <div className="history-meta">
              <span className="history-rating">★ {item.rating}</span>
              <span className="history-date">{formatDate(item.savedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
