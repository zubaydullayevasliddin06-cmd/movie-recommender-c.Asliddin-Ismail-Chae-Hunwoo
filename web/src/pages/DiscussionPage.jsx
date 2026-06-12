import { useState } from 'react'
import './DiscussionPage.css'

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY
const IMG_W342 = 'https://image.tmdb.org/t/p/w342'
const IMG_W185 = 'https://image.tmdb.org/t/p/w185'
const IMG_BACK = 'https://image.tmdb.org/t/p/w1280'

export default function DiscussionPage() {
  const [query,    setQuery]    = useState('')
  const [results,  setResults]  = useState([])   // TMDB search results
  const [movie,    setMovie]    = useState(null)  // selected full movie
  const [cast,     setCast]     = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [step,     setStep]     = useState('search') // search | results | loading | done
  const [error,    setError]    = useState('')

  // Step 1 — search TMDB
  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setStep('results'); setError('')
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}&page=1`
    const data = await fetch(url).then(r => r.json()).catch(() => ({ results: [] }))
    setResults((data.results || []).slice(0, 6))
  }

  // Step 2 — pick a movie, load credits + AI analysis
  async function pickMovie(m) {
    setStep('loading'); setMovie(m); setResults([]); setCast([]); setAnalysis(null)

    // Fetch full cast from TMDB
    const credits = await fetch(
      `https://api.themoviedb.org/3/movie/${m.id}/credits?api_key=${TMDB_KEY}`
    ).then(r => r.json()).catch(() => ({}))

    const topCast = (credits.cast || []).slice(0, 8)
    const director = (credits.crew || []).find(p => p.job === 'Director')
    const writer   = (credits.crew || []).find(p => ['Screenplay','Writer','Story'].includes(p.job))
    setCast(topCast)

    // Fetch AI analysis from our backend
    const ai = await fetch('/api/discuss', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: m.title, year: m.release_date?.slice(0,4), overview: m.overview }),
    }).then(r => r.json()).catch(() => null)

    setAnalysis({ ...ai, director, writer })
    setStep('done')
  }

  function reset() { setStep('search'); setQuery(''); setMovie(null); setResults([]); setCast([]); setAnalysis(null) }

  return (
    <div className="disc-page">
      <div className="disc-hero-text">
        <h2 className="disc-title">💬 Discussion</h2>
        <p className="disc-sub">Type any movie — get the full story: cast, themes, epic moments, and discussion questions.</p>
      </div>

      {/* Search bar — always visible */}
      <form className="disc-search-form" onSubmit={handleSearch}>
        <input
          className="disc-search"
          type="text"
          placeholder="Search any movie… e.g. Inception, Parasite, Interstellar"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="disc-search-btn" type="submit">Search</button>
      </form>

      {/* Search results picker */}
      {step === 'results' && (
        <div className="disc-results">
          <p className="disc-hint">Pick the right one:</p>
          <div className="disc-picks">
            {results.length === 0 && <p className="disc-none">No results found.</p>}
            {results.map(m => (
              <div key={m.id} className="disc-pick" onClick={() => pickMovie(m)}>
                {m.poster_path
                  ? <img src={`${IMG_W185}${m.poster_path}`} alt={m.title} />
                  : <div className="disc-no-poster">🎬</div>
                }
                <div className="disc-pick-info">
                  <strong>{m.title}</strong>
                  <span>{m.release_date?.slice(0,4)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {step === 'loading' && (
        <div className="disc-loading">
          <div className="disc-spinner" />
          <p>Loading cast, director, and AI analysis for <strong>{movie?.title}</strong>…</p>
          <p className="disc-loading-sub">The AI is reading the full film — this takes about 15 seconds.</p>
        </div>
      )}

      {/* Full discussion view */}
      {step === 'done' && movie && analysis && (
        <div className="disc-content">
          {/* Backdrop */}
          {movie.backdrop_path && (
            <div className="disc-backdrop" style={{ backgroundImage: `url(${IMG_BACK}${movie.backdrop_path})` }}>
              <div className="disc-backdrop-overlay" />
            </div>
          )}

          {/* Movie header */}
          <div className="disc-movie-header">
            {movie.poster_path && (
              <img className="disc-poster" src={`${IMG_W342}${movie.poster_path}`} alt={movie.title} />
            )}
            <div className="disc-movie-meta">
              <h1 className="disc-movie-title">{movie.title}</h1>
              <div className="disc-badges">
                <span className="disc-badge">📅 {movie.release_date?.slice(0,4)}</span>
                <span className="disc-badge">★ {movie.vote_average?.toFixed(1)}</span>
                {movie.runtime && <span className="disc-badge">⏱ {movie.runtime} min</span>}
                {movie.genres?.map(g => <span key={g.id} className="disc-badge">{g.name}</span>)}
              </div>
              {analysis.director && (
                <p className="disc-credit">🎬 Director: <strong>{analysis.director.name}</strong></p>
              )}
              {analysis.writer && (
                <p className="disc-credit">✍️ Screenplay: <strong>{analysis.writer.name}</strong></p>
              )}
              <p className="disc-overview">{movie.overview}</p>
              <button className="disc-reset-btn" onClick={reset}>← Search another movie</button>
            </div>
          </div>

          {/* Cast */}
          {cast.length > 0 && (
            <section className="disc-section">
              <h3 className="disc-section-title">🎭 Cast</h3>
              <div className="disc-cast">
                {cast.map(a => (
                  <div key={a.id} className="disc-actor">
                    {a.profile_path
                      ? <img src={`${IMG_W185}${a.profile_path}`} alt={a.name} />
                      : <div className="disc-no-photo">👤</div>
                    }
                    <p className="disc-actor-name">{a.name}</p>
                    <p className="disc-actor-char">{a.character}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI Analysis */}
          <section className="disc-section">
            <h3 className="disc-section-title">🤖 AI Analysis</h3>
            <div className="disc-analysis-grid">

              <div className="disc-card">
                <h4>🎯 Main Theme & Goal</h4>
                <p>{analysis.theme}</p>
              </div>

              <div className="disc-card">
                <h4>✨ What Makes It Special</h4>
                <p>{analysis.whatMakesItSpecial}</p>
              </div>

              {analysis.directorVision && (
                <div className="disc-card">
                  <h4>🎬 Director's Vision</h4>
                  <p>{analysis.directorVision}</p>
                </div>
              )}

              <div className="disc-card disc-card-full">
                <h4>🔥 Epic & Memorable Moments</h4>
                <ul className="disc-moments">
                  {(analysis.epicMoments || []).map((m, i) => (
                    <li key={i}><span className="disc-num">{i + 1}</span>{m}</li>
                  ))}
                </ul>
              </div>

              <div className="disc-card disc-card-full">
                <h4>💬 Discussion Questions</h4>
                <ul className="disc-questions">
                  {(analysis.discussionQuestions || []).map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

            </div>
          </section>
        </div>
      )}
    </div>
  )
}
