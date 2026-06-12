import { useState, useEffect } from 'react'
import './Library.css'

const GENRES  = ['All', 'action', 'comedy', 'scifi', 'drama', 'horror', 'cozy']
const GENRE_LABELS = { All:'All', action:'Action', comedy:'Comedy', scifi:'Sci-Fi', drama:'Drama', horror:'Horror', cozy:'Cozy' }

export default function Library() {
  const [titles, setTitles]   = useState([])
  const [loading, setLoading] = useState(true)
  const [type, setType]       = useState('All')   // All / Movie / Game
  const [genre, setGenre]     = useState('All')
  const [search, setSearch]   = useState('')

  useEffect(() => {
    fetch('/api/titles')
      .then(r => r.json())
      .then(data => { setTitles(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const visible = titles.filter(t => {
    if (type  !== 'All' && t.type  !== type)  return false
    if (genre !== 'All' && t.genre !== genre) return false
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  if (loading) return <p className="lib-status">Loading library…</p>

  return (
    <div className="library">
      <h2 className="lib-title">Browse the Library</h2>
      <p className="lib-sub">{titles.length} titles — movies &amp; games</p>

      {/* Search */}
      <input
        className="lib-search"
        type="text"
        placeholder="Search by title…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Type filter */}
      <div className="lib-filters">
        {['All', 'Movie', 'Game'].map(t => (
          <button
            key={t}
            className={`lib-chip${type === t ? ' active' : ''}`}
            onClick={() => setType(t)}
          >
            {t === 'Movie' ? '🎬 Movies' : t === 'Game' ? '🎮 Games' : '✨ All'}
          </button>
        ))}
      </div>

      {/* Genre filter */}
      <div className="lib-filters">
        {GENRES.map(g => (
          <button
            key={g}
            className={`lib-chip small${genre === g ? ' active' : ''}`}
            onClick={() => setGenre(g)}
          >
            {GENRE_LABELS[g]}
          </button>
        ))}
      </div>

      <p className="lib-count">{visible.length} result{visible.length !== 1 ? 's' : ''}</p>

      {/* Grid */}
      <div className="lib-grid">
        {visible.map(t => (
          <div key={t.title + t.year} className="lib-card">
            <div className="lib-card-header">
              <span className="lib-emoji">{t.type === 'Movie' ? '🎬' : '🎮'}</span>
              <span className="lib-rating">★ {t.rating}</span>
            </div>
            <h3 className="lib-name">{t.title}</h3>
            <p className="lib-year">{t.year}</p>
            <div className="lib-tags">
              <span className="lib-tag">{GENRE_LABELS[t.genre]}</span>
              <span className="lib-tag">{t.mood}</span>
              <span className="lib-tag">{t.timeNeed}</span>
              {t.social !== 'any' && <span className="lib-tag">{t.social}</span>}
            </div>
            <p className="lib-desc">{t.desc}</p>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="lib-status">No titles match your filters.</p>
      )}
    </div>
  )
}
