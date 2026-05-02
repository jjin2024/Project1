import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import './Diary.css'

const PINS = [
  {
    id: 1, emoji: '⛰', color: '#1a3a2a',
    name: '청량산 도립공원', region: '봉화군',
    date: '2025. 4. 28', phrase: '봉화, 자연이 말을 거는 곳',
    memo: '안개 속에 홀로 걸었다. 아무도 없었다.',
    mapTop: '30%', mapLeft: '38%',
  },
  {
    id: 2, emoji: '🍄', color: '#2d5a3d',
    name: '봉화 송이밸리', region: '봉화군',
    date: '2025. 4. 20', phrase: '봉화, 향이 공기를 채우는 곳',
    memo: '송이 향이 오래 남았다. 계절의 끝자락.',
    mapTop: '24%', mapLeft: '34%',
  },
  {
    id: 3, emoji: '🌲', color: '#4a7c5f',
    name: '영양 자작나무숲', region: '영양군',
    date: '2025. 4. 12', phrase: '영양, 하얀 숲이 기다리는 곳',
    memo: '하얀 나무들이 빛을 반사했다. 조용한 눈부심.',
    mapTop: '46%', mapLeft: '58%',
  },
]

export default function Diary() {
  const navigate = useNavigate()
  const [sel, setSel]       = useState(null)
  const [photos, setPhotos] = useState({})
  const fileRef             = useRef(null)

  const handlePhoto = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPhotos(p => ({ ...p, [sel]: ev.target.result }))
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const removePhoto = e => {
    e.stopPropagation()
    setPhotos(p => { const next = { ...p }; delete next[sel]; return next })
  }

  if (sel) {
    const p = PINS.find(x => x.id === sel)
    return (
      <div className="diary">
        <div className="diary-scroll">
          <button className="diary-back-btn" onClick={() => setSel(null)}>‹ 목록으로</button>

          <div className="detail-card" style={{ background: p.color }}>
            <div className="detail-top">
              <span className="detail-date">{p.date}</span>
              <span className="detail-emoji">{p.emoji}</span>
            </div>
            <h2 className="detail-name">{p.name}</h2>
            <p className="detail-region">📍 {p.region}</p>
            <p className="detail-phrase">"{p.phrase}"</p>
            <div className="detail-rule" />
            <p className="detail-memo">{p.memo}</p>
          </div>

          {/* 사진 영역 */}
          <div
            className={`detail-photo-wrap ${photos[sel] ? 'has-photo' : ''}`}
            onClick={() => !photos[sel] && fileRef.current?.click()}
          >
            {photos[sel] ? (
              <>
                <img src={photos[sel]} alt="장소 사진" className="detail-photo-img" />
                <div className="detail-photo-overlay">
                  <button
                    className="detail-photo-change"
                    onClick={e => { e.stopPropagation(); fileRef.current?.click() }}
                  >
                    ✎ 사진 변경
                  </button>
                  <button className="detail-photo-remove" onClick={removePhoto}>
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <div className="detail-photo-empty">
                <span className="detail-photo-ic">📷</span>
                <p className="detail-photo-label">사진 추가하기</p>
                <p className="detail-photo-hint">탭해서 갤러리에서 선택</p>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            style={{ display: 'none' }}
          />

          <div className="detail-actions">
            <button className="det-btn det-dl">⬇ 다운로드</button>
            <button className="det-btn det-edit">✎ 수정</button>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="diary">
      <div className="diary-scroll">
        <div className="diary-top">
          <h1 className="diary-title">내 여행 기록</h1>
          <span className="diary-cnt">{PINS.length}개의 핀</span>
        </div>

        <div className="diary-map">
          <div className="dmap-inner">
            <span className="dmap-region-label">경상북도</span>
            {PINS.map(p => (
              <button
                key={p.id}
                className="dmap-pin"
                style={{ top: p.mapTop, left: p.mapLeft }}
                onClick={() => setSel(p.id)}
              >
                <span className="dmap-dot" />
                <span className="dmap-name">{p.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="diary-list">
          {PINS.map(p => (
            <div key={p.id} className="diary-card" onClick={() => setSel(p.id)}>
              <div className="diary-thumb" style={{ background: p.color }}>
                {photos[p.id]
                  ? <img src={photos[p.id]} alt="" className="diary-thumb-photo" />
                  : p.emoji
                }
              </div>
              <div className="diary-info">
                <p className="diary-name">{p.name}</p>
                <p className="diary-meta">{p.region} · {p.date}</p>
                <p className="diary-memo">{p.memo}</p>
              </div>
              <span className="diary-arr">›</span>
            </div>
          ))}
        </div>

        <button className="diary-dl-all">⬇ 전체 다이어리 다운로드</button>
      </div>
      <BottomNav />
    </div>
  )
}
