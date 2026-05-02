import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './BottomNav.css'

const ITEMS = [
  { id: 'home',    label: '홈',      icon: '⌂',  path: '/home' },
  { id: 'pindraw', label: '쉼표뽑기', icon: '🎴', path: '/pindraw' },
  { id: 'map',     label: '지도',     icon: '🗺', path: '/map' },
  { id: 'diary',   label: '다이어리', icon: '📖', path: '/diary' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="bnav">
      {ITEMS.map(item => {
        const isActive = pathname === item.path
        return (
          <button
            key={item.id}
            className={`bnav-item ${isActive ? 'on' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="bnav-icon">{item.icon}</span>
            <span className="bnav-label">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
