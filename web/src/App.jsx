import { useState } from 'react'
import './App.css'

export default function App() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  async function findMatch(event) {
    event.preventDefault()
    const value = text.trim()
    if (!value) return

    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="card">
      <h1>🎬 CINEMATCH</h1>
      <p className="tagline">
        Tell me how you feel. I'll pick your movie or game for tonight — and say why.
      </p>

      <form onSubmit={findMatch}>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. something scary but short, watching with friends"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking…' : 'Find my match'}
        </button>
      </form>

      {loading && (
        <p className="status">
          The AI is reading your mood and the C engine is scoring 55 titles…
        </p>
      )}
      {error && <p className="status error">⚠️ {error}</p>}

      {result && (
        <section className="result">
          <h2>
            {result.title.type === 'Movie' ? '🎬' : '🎮'} {result.title.title} ({result.title.year})
          </h2>
          <p className="meta">
            {result.title.genre} · {result.title.mood} · rating {result.title.rating}
          </p>
          <p className="why">{result.explanation}</p>
        </section>
      )}
    </main>
  )
}
