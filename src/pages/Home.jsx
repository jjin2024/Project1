import React from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import './Home.css'

const RECENT = [
  { emoji: '⛰', color: '#1a3a2a', name: '청량산 도립공원',  region: '봉화군', memo: '아무도 없던 그 길' },
  { emoji: '🍄', color: '#2d5a3d', name: '봉화 송이밸리',    region: '봉화군', memo: '향이 오래 남는 곳' },
  { emoji: '🌲', color: '#4a7c5f', name: '영양 자작나무숲',  region: '영양군', memo: '하얀 나무들이 빛났어' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-scroll">
        <header className="home-header">
          <div className="home-topbar">
            <span className="home-brand">쉼표</span>
            <button className="home-settings">⚙</button>
          </div>
          <h1 className="home-title">오늘 어디로<br />떠나볼까요?</h1>
        </header>

        <div className="home-ctas">
          <button className="cta cta-main" onClick={() => navigate('/pindraw')}>
            <span className="cta-bg-kanji">無</span>
            <div className="cta-body">
              <span className="cta-eyebrow">랜덤 추천</span>
              <span className="cta-name">쉼표 뽑기</span>
              <span className="cta-hint">지금 바로 출발 →</span>
            </div>
          </button>
          <button className="cta cta-sub">
            <span className="cta-sub-icon">🔍</span>
            <div className="cta-body cta-body-sub">
              <span className="cta-sub-eyebrow">장소 검색</span>
              <span className="cta-sub-name">갈 곳이<br />있어요</span>
            </div>
          </button>
        </div>

        <div className="home-banner">
          <span className="banner-badge">안전 ✓</span>
          <div className="banner-text">
            <p className="banner-title">경상북도 공식 협력 서비스</p>
            <p className="banner-desc">봉화 · 영양 · 울진 · 안동 외 전 지역</p>
          </div>
          <span className="banner-arr">→</span>
        </div>

        <section className="home-sec">
          <div className="sec-row">
            <h2 className="sec-title">최근 핀 기록</h2>
            <button className="sec-more" onClick={() => navigate('/diary')}>전체 보기</button>
          </div>
          {RECENT.map((p, i) => (
            <div className="pin-row" key={i} onClick={() => navigate('/diary')}>
              <div className="pin-thumb" style={{ background: p.color }}>{p.emoji}</div>
              <div className="pin-body">
                <p className="pin-name">{p.name}</p>
                <p className="pin-loc">{p.region}</p>
                <p className="pin-memo">{p.memo}</p>
              </div>
              <span className="pin-arr">›</span>
            </div>
          ))}
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
