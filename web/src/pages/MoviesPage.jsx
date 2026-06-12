import { useState, useEffect } from 'react'
import './MoviesPage.css'

const KEY      = import.meta.env.VITE_TMDB_KEY
const IMG      = 'https://image.tmdb.org/t/p/w342'
const BASE_URL = 'https://api.themoviedb.org/3'

const GENRES = [
  { id: '',    name: 'All'       },
  { id: 28,    name: 'Action'    },
  { id: 35,    name: 'Comedy'    },
  { id: 878,   name: 'Sci-Fi'   },
  { id: 18,    name: 'Drama'     },
  { id: 27,    name: 'Horror'    },
  { id: 16,    name: 'Animation' },
  { id: 9648,  name: 'Mystery'   },
  { id: 12,    name: 'Adventure' },
]

export default function MoviesPage() {
  const [movies,  setMovies]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [query,   setQuery]   = useState('')
  const [genre,   setGenre]   = useState('')
  const [page,    setPage]    = useState(1)
  const [total,   setTotal]   = useState(0)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!KEY) { setError('no-key'); setLoading(false); return }
    setLoading(true)
    const url = query
      ? `${BASE_URL}/search/movie?api_key=${KEY}&query=${encodeURIComponent(query)}&page=${page}`
      : `${BASE_URL}/discover/movie?api_key=${KEY}&sort_by=popularity.desc&with_genres=${genre}&page=${page}`

    fetch(url)
      .then(r => r.json())
      .then(d => { setMovies(d.results || []); setTotal(d.total_pages || 1); setLoading(false) })
      .catch(() => { setError('fetch-error'); setLoading(false) })
  }, [query, genre, page])

  // reset page when filters change
  function handleQuery(v)  { setQuery(v); setPage(1) }
  function handleGenre(id) { setGenre(id); setQuery(''); setPage(1) }

  if (error === 'no-key') return <NoKey />

  return (
    <div className="movies-page">
      <div className="mp-header">
        <h2 className="mp-title">🎬 Movies</h2>
        <input
          className="mp-search"
          type="text"
          placeholder="Search movies…"
          value={query}
          onChange={e => handleQuery(e.target.value)}
        />
      </div>

      <div className="mp-genres">
        {GENRES.map(g => (
          <button
            key={g.id}
            className={`mp-chip${genre === g.id ? ' active' : ''}`}
            onClick={() => handleGenre(g.id)}
          >
            {g.name}
          </button>
        ))}
      </div>

      {loading && <p className="mp-status">Loading…</p>}
      {error === 'fetch-error' && <p className="mp-status">Could not load movies. Check your API key.</p>}

      <div className="mp-grid">
        {movies.map(m => (
          <div key={m.id} className="mp-card" onClick={() => setSelected(m)}>
            <div className="mp-poster-wrap">
              {m.poster_path
                ? <img className="mp-poster" src={`${IMG}${m.poster_path}`} alt={m.title} loading="lazy" />
                : <div className="mp-no-poster">🎬</div>
              }
              <span className="mp-score">★ {m.vote_average?.toFixed(1)}</span>
            </div>
            <div className="mp-info">
              <p className="mp-name">{m.title}</p>
              <p className="mp-year">{m.release_date?.slice(0,4)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!loading && total > 1 && (
        <div className="mp-pager">
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>← Prev</button>
          <span>Page {page} of {Math.min(total, 500)}</span>
          <button onClick={() => setPage(p => Math.min(total, p+1))} disabled={page >= total}>Next →</button>
        </div>
      )}

      {/* Detail modal */}
      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function MovieModal({ movie, onClose }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          {movie.poster_path
            ? <img className="modal-poster" src={`${IMG}${movie.poster_path}`} alt={movie.title} />
            : <div className="modal-no-poster">🎬</div>
          }
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <p className="modal-meta">
              📅 {movie.release_date?.slice(0,4)} &nbsp;·&nbsp; ★ {movie.vote_average?.toFixed(1)} &nbsp;·&nbsp; {movie.vote_count?.toLocaleString()} votes
            </p>
            <p className="modal-overview">{movie.overview || 'No description available.'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function NoKey() {
  return (
    <div className="no-key-box">
      <h2>🔑 One more free API key needed</h2>
      <p>The Movies page uses <strong>TMDB</strong> (The Movie Database) — the world's most popular free movie database with posters, ratings, and thousands of films.</p>
      <ol>
        <li>Go to <strong>themoviedb.org</strong> → sign up (free)</li>
        <li>Go to <strong>Settings → API → Create</strong> → choose "Developer"</li>
        <li>Copy your <strong>API Key (v3 auth)</strong></li>
        <li>Create a file called <code>web/.env.local</code> and add:<br/>
          <code>VITE_TMDB_KEY=paste_your_key_here</code>
        </li>
        <li>Restart the frontend (<code>npm run dev</code>)</li>
      </ol>
      <p>It's free, takes 2 minutes, and unlocks thousands of real movies with posters!</p>
    </div>
  )
}
