import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AiPage.css'

export default function AiPage() {
  const { user, authHeader } = useAuth()
  const [text, setText]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [result, setResult]   = useState(null)
  const [saved, setSaved]     = useState(false)

  async function findMatch(e) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    setLoading(true); setError(''); setResult(null); setSaved(false)
    try {
      const res  = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setResult(data)

      // Auto-save to history if the user is logged in.
      if (user && data.title) {
        fetch('/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...authHeader() },
          body: JSON.stringify({
            title:       data.title.title,
            type:        data.title.type,
            year:        data.title.year,
            genre:       data.title.genre,
            mood:        data.title.mood,
            rating:      data.title.rating,
            mood_input:  value,
            explanation: data.explanation,
          }),
        })
          .then(r => r.ok && setSaved(true))
          .catch(() => {})
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-page">
      <div className="ai-card">
        <h1 className="ai-title">✨ Find My Match</h1>
        <p className="ai-sub">
          Describe your mood in plain words — the AI and our C engine will pick
          the perfect movie or game for tonight and explain why.
        </p>

        <form onSubmit={findMatch}>
          <textarea
            className="ai-input"
            rows={3}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="e.g. something scary but short, watching with friends…"
          />
          <button className="ai-btn" type="submit" disabled={loading}>
            {loading ? 'Thinking…' : 'Find my match'}
          </button>
        </form>

        {loading && (
          <p className="ai-status">
            AI is reading your mood · C engine is scoring 55 titles…
          </p>
        )}
        {error && <p className="ai-status error">⚠️ {error}</p>}

        {result && (
          <section className="ai-result">
            <div className="ai-result-header">
              <span className="ai-icon">
                {result.title.type === 'Movie' ? '🎬' : '🎮'}
              </span>
              <div>
                <h2 className="ai-result-title">
                  {result.title.title} <span className="ai-year">({result.title.year})</span>
                </h2>
                <p className="ai-meta">
                  {result.title.genre} · {result.title.mood} · ★ {result.title.rating}
                </p>
              </div>
            </div>
            <p className="ai-why">{result.explanation}</p>
            {saved && (
              <p className="ai-saved">✓ Saved to your history</p>
            )}
            {!user && (
              <p className="ai-save-hint">Log in to save this pick to your history.</p>
            )}
          </section>
        )}
      </div>

      <div className="ai-how">
        <h3>How it works</h3>
        <div className="ai-steps">
          <div className="ai-step"><span>1</span>You describe your mood</div>
          <div className="ai-arrow">→</div>
          <div className="ai-step"><span>2</span>AI converts it to preferences</div>
          <div className="ai-arrow">→</div>
          <div className="ai-step"><span>3</span>C engine scores 55 titles</div>
          <div className="ai-arrow">→</div>
          <div className="ai-step"><span>4</span>AI explains the pick</div>
        </div>
      </div>
    </div>
  )
}
