import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import PinDraw from './pages/PinDraw'
import Diary from './pages/Diary'

export default function App() {
  return (
    <div className="phone-wrap">
      <div className="phone-frame">
        <Routes>
          <Route path="/"           element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home"       element={<Home />} />
          <Route path="/pindraw"    element={<PinDraw />} />
          <Route path="/diary"      element={<Diary />} />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
