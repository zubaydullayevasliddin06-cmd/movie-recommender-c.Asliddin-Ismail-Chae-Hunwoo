import { useState, useEffect } from 'react'
import './GamesPage.css'

const KEY      = import.meta.env.VITE_RAWG_KEY
const BASE_URL = 'https://api.rawg.io/api'

const GENRES = [
  { slug: '',          name: 'All'         },
  { slug: 'action',    name: 'Action'      },
  { slug: 'rpg',       name: 'RPG'         },
  { slug: 'adventure', name: 'Adventure'   },
  { slug: 'shooter',   name: 'Shooter'     },
  { slug: 'strategy',  name: 'Strategy'    },
  { slug: 'puzzle',    name: 'Puzzle'      },
  { slug: 'sports',    name: 'Sports'      },
  { slug: 'indie',     name: 'Indie'       },
]

export default function GamesPage() {
  const [games,   setGames]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [query,   setQuery]   = useState('')
  const [genre,   setGenre]   = useState('')
  const [page,    setPage]    = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!KEY) { setError('no-key'); setLoading(false); return }
    setLoading(true)
    const params = new URLSearchParams({
      key: KEY, page, page_size: 24,
      ...(query ? { search: query } : {}),
      ...(genre ? { genres: genre } : {}),
      ordering: '-rating',
    })
    fetch(`${BASE_URL}/games?${params}`)
      .then(r => r.json())
      .then(d => { setGames(d.results || []); setHasNext(!!d.next); setLoading(false) })
      .catch(() => { setError('fetch-error'); setLoading(false) })
  }, [query, genre, page])

  function handleQuery(v) { setQuery(v); setPage(1) }
  function handleGenre(s) { setGenre(s); setQuery(''); setPage(1) }

  if (error === 'no-key') return <NoKey />

  return (
    <div className="games-page">
      <div className="gp-header">
        <h2 className="gp-title">🎮 Games</h2>
        <input
          className="gp-search"
          type="text"
          placeholder="Search games…"
          value={query}
          onChange={e => handleQuery(e.target.value)}
        />
      </div>

      <div className="gp-genres">
        {GENRES.map(g => (
          <button
            key={g.slug}
            className={`gp-chip${genre === g.slug ? ' active' : ''}`}
            onClick={() => handleGenre(g.slug)}
          >
            {g.name}
          </button>
        ))}
      </div>

      {loading && <p className="gp-status">Loading…</p>}
      {error === 'fetch-error' && <p className="gp-status">Could not load games. Check your API key.</p>}

      <div className="gp-grid">
        {games.map(g => (
          <div key={g.id} className="gp-card" onClick={() => setSelected(g)}>
            <div className="gp-cover-wrap">
              {g.background_image
                ? <img className="gp-cover" src={g.background_image} alt={g.name} loading="lazy" />
                : <div className="gp-no-cover">🎮</div>
              }
              <span className="gp-score">★ {g.rating?.toFixed(1)}</span>
            </div>
            <div className="gp-info">
              <p className="gp-name">{g.name}</p>
              <p className="gp-year">{g.released?.slice(0,4)}</p>
            </div>
          </div>
        ))}
      </div>

      {!loading && (
        <div className="gp-pager">
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>← Prev</button>
          <span>Page {page}</span>
          <button onClick={() => setPage(p => p+1)} disabled={!hasNext}>Next →</button>
        </div>
      )}

      {selected && <GameModal game={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function GameModal({ game, onClose }) {
  const genreNames = game.genres?.map(g => g.name).join(', ') || '—'
  const platforms  = game.platforms?.map(p => p.platform.name).slice(0,4).join(', ') || '—'
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          {game.background_image
            ? <img className="modal-cover" src={game.background_image} alt={game.name} />
            : <div className="modal-no-cover">🎮</div>
          }
          <div className="modal-info">
            <h2>{game.name}</h2>
            <p className="modal-meta">
              📅 {game.released?.slice(0,4)} &nbsp;·&nbsp; ★ {game.rating?.toFixed(1)} &nbsp;·&nbsp; {game.ratings_count?.toLocaleString()} ratings
            </p>
            <p className="modal-detail"><strong>Genres:</strong> {genreNames}</p>
            <p className="modal-detail"><strong>Platforms:</strong> {platforms}</p>
            {game.description_raw && (
              <p className="modal-overview">{game.description_raw.slice(0,400)}…</p>
            )}
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
      <p>The Games page uses <strong>RAWG</strong> — the world's largest video game database with 800,000+ games, cover art, ratings, and more.</p>
      <ol>
        <li>Go to <strong>rawg.io/apidocs</strong> → click <strong>"Get API key"</strong></li>
        <li>Sign up (free) and copy your key</li>
        <li>Open the file <code>web/.env.local</code> and add:<br/>
          <code>VITE_RAWG_KEY=paste_your_key_here</code>
        </li>
        <li>Restart the frontend (<code>npm run dev</code>)</li>
      </ol>
      <p>Free plan: 20,000 requests per month — more than enough!</p>
    </div>
  )
}
