import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import './PinDraw.css'

const PLACES = [
  {
    id: 1, emoji: '⛰', color: '#1e4535',
    name: '청량산 도립공원', region: '봉화군',
    tags: ['🌿 자연', '🥾 트레킹'],
    desc: '기암절벽과 솔숲이 어우러진 청정 명산. 봉화의 비밀처럼 조용하다.',
    crowd: '매우 한적', dist: '대구에서 2시간 12분',
  },
  {
    id: 2, emoji: '🌊', color: '#243f35',
    name: '반변천 생태공원', region: '영양군',
    tags: ['🌾 강변', '🚶 산책'],
    desc: '별빛 아래 강변을 따라 걷는 고요한 산책로. 영양의 어두운 밤이 선물이다.',
    crowd: '한적', dist: '대구에서 2시간 40분',
  },
  {
    id: 3, emoji: '🏞', color: '#1a3530',
    name: '불영계곡', region: '울진군',
    tags: ['💧 계곡', '🌲 드라이브'],
    desc: '36km의 기암절벽과 에메랄드 물빛. 말이 필요 없는 비경.',
    crowd: '보통', dist: '대구에서 3시간',
  },
]

const FB_CHIPS = [
  '너무 멀어요', '더 조용한 곳이 좋아요',
  '먹거리도 있었으면 해요', '걷기 싫어요', '볼거리가 부족해요',
]

export default function PinDraw() {
  const navigate = useNavigate()
  const [idx, setIdx] = useState(0)
  const [pinned, setPinned] = useState([])
  const [done, setDone] = useState(false)
  const [showFB, setShowFB] = useState(false)
  const [selFB, setSelFB] = useState([])

  const place = PLACES[idx]

  const advance = () => {
    if (idx >= PLACES.length - 1) setDone(true)
    else { setIdx(i => i + 1); setShowFB(false) }
  }

  const handlePin = () => {
    setPinned(p => [...p, place])
    advance()
  }

  const toggleFB = chip => setSelFB(p => p.includes(chip) ? p.filter(c => c !== chip) : [...p, chip])

  const reset = () => { setIdx(0); setPinned([]); setDone(false); setShowFB(false); setSelFB([]) }

  if (done) return (
    <div className="pd">
      <div className="pd-done-scroll">
        <div className="pd-done-head">
          <span className="pd-done-icon">📍</span>
          <h2 className="pd-done-title">쉼표 뽑기 완료</h2>
          <p className="pd-done-sub">핀한 장소 {pinned.length}곳이에요</p>
        </div>

        <div className="pd-done-list">
          {pinned.length === 0
            ? <p className="pd-done-empty">핀한 장소가 없어요</p>
            : pinned.map(p => (
              <div className="pd-done-item" key={p.id}>
                <div className="pd-done-thumb" style={{ background: p.color }}>{p.emoji}</div>
                <div>
                  <p className="pd-done-name">{p.name}</p>
                  <p className="pd-done-region">{p.region}</p>
                </div>
              </div>
            ))
          }
        </div>

        {pinned.length > 0 && (
          <button className="pd-kakao">🗺 가장 가까운 곳으로 — 카카오맵 열기</button>
        )}
        <button className="pd-retry" onClick={reset}>다른 쉼표 뽑기</button>
        <button className="pd-home-link" onClick={() => navigate('/home')}>홈으로</button>
      </div>
      <BottomNav />
    </div>
  )

  return (
    <div className="pd">
      <div className="pd-scroll">
        <div className="pd-header">
          <button className="pd-back" onClick={() => navigate('/home')}>‹</button>
          <h2 className="pd-title">쉼표 뽑기</h2>
          <span className="pd-prog">{idx + 1} / {PLACES.length}</span>
        </div>

        <div className="pd-dots">
          {PLACES.map((_, i) => (
            <span key={i} className={`pd-dot ${i === idx ? 'cur' : i < idx ? 'past' : ''}`} />
          ))}
        </div>

        <div className="pd-card" style={{ background: place.color }}>
          <div className="pd-card-hero">{place.emoji}</div>
          <div className="pd-card-body">
            <div className="pd-tags">
              {place.tags.map(t => <span className="pd-tag" key={t}>{t}</span>)}
            </div>
            <h3 className="pd-name">{place.name}</h3>
            <p className="pd-region">📍 {place.region}</p>
            <p className="pd-desc">{place.desc}</p>
            <div className="pd-meta">
              <span className="pd-crowd"><span className="crowd-led" />{place.crowd}</span>
              <span className="pd-dist">🚗 {place.dist}</span>
            </div>
          </div>
        </div>

        {showFB ? (
          <div className="fb-area">
            <p className="fb-label">어떤 점이 아쉬웠나요?</p>
            <div className="fb-chips">
              {FB_CHIPS.map(c => (
                <button
                  key={c}
                  className={`fb-chip ${selFB.includes(c) ? 'on' : ''}`}
                  onClick={() => toggleFB(c)}
                >{c}</button>
              ))}
            </div>
          </div>
        ) : (
          <button className="fb-link" onClick={() => setShowFB(true)}>
            이번 추천이 마음에 들지 않나요? 다른 쉼표를 뽑아볼게요 →
          </button>
        )}

        {pinned.length > 0 && (
          <div className="pd-pinned">
            <p className="pd-pinned-label">핀한 장소</p>
            <div className="pd-pinned-chips">
              {pinned.map(p => <span className="pd-pinned-chip" key={p.id}>{p.emoji} {p.name}</span>)}
            </div>
          </div>
        )}
      </div>

      <div className="pd-actions">
        <button className="pd-pass" onClick={advance}>
          <span>✕</span><span>패스</span>
        </button>
        <button className="pd-pin" onClick={handlePin}>
          <span>📍</span><span>핀하기</span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
