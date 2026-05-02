import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Splash.css'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding'), 2200)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="splash">
      <div className="splash-kanji">無</div>
      <div className="splash-center">
        <h1 className="splash-title">무인</h1>
        <p className="splash-sub">고르지 않아도 되는 여행</p>
      </div>
      <div className="splash-dots">
        <span className="splash-dot on" />
        <span className="splash-dot" />
        <span className="splash-dot" />
      </div>
    </div>
  )
}
