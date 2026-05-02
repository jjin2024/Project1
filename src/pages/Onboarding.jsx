import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Onboarding.css'

const VIBES = [
  { id: 'nature',   emoji: '🌿', label: '조용한 자연', desc: '숲, 강, 들판' },
  { id: 'culture',  emoji: '🏛',  label: '문화·역사',  desc: '고택, 박물관' },
  { id: 'farm',     emoji: '🌾', label: '체험·농가',  desc: '계절 체험, 농촌' },
  { id: 'wellness', emoji: '🛁', label: '웰니스',     desc: '온천, 힐링 숙소' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [sel, setSel] = useState([])
  const toggle = id => setSel(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  return (
    <div className="ob">
      <div className="ob-top">
        <span className="ob-eyebrow">취향 설정</span>
        <h1 className="ob-title">어떤 여행이<br />좋으세요?</h1>
        <p className="ob-hint">복수 선택 가능해요</p>
      </div>

      <div className="ob-grid">
        {VIBES.map(v => (
          <button
            key={v.id}
            className={`vibe-card ${sel.includes(v.id) ? 'on' : ''}`}
            onClick={() => toggle(v.id)}
          >
            {sel.includes(v.id) && <span className="vibe-check">✓</span>}
            <span className="vibe-emoji">{v.emoji}</span>
            <span className="vibe-label">{v.label}</span>
            <span className="vibe-desc">{v.desc}</span>
          </button>
        ))}
      </div>

      <div className="ob-footer">
        <button className="ob-cta" onClick={() => navigate('/home')}>시작하기</button>
        <button className="ob-skip" onClick={() => navigate('/home')}>나중에 설정할게요</button>
      </div>
    </div>
  )
}
