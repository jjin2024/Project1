import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'

const SPOTS = [
  { id: 1,  name: '청량산 도립공원', region: '봉화군', tag: '자연', emoji: '⛰', desc: '기암절벽과 솔숲이 어우러진 청정 명산' },
  { id: 2,  name: '반변천 생태공원', region: '영양군', tag: '자연', emoji: '🌊', desc: '별빛 아래 강변을 따라 걷는 고요한 산책로' },
  { id: 3,  name: '불영계곡',        region: '울진군', tag: '자연', emoji: '🏞', desc: '36km 에메랄드 물빛 계곡의 비경' },
  { id: 4,  name: '도산서원',        region: '안동시', tag: '문화', emoji: '🏛', desc: '퇴계 이황의 정신이 깃든 유네스코 세계유산' },
  { id: 5,  name: '하회마을',        region: '안동시', tag: '문화', emoji: '🏡', desc: '낙동강이 감싸는 600년 전통 마을' },
  { id: 6,  name: '주왕산 국립공원', region: '청송군', tag: '자연', emoji: '🗻', desc: '기암단애가 절경인 국립공원' },
  { id: 7,  name: '문경새재',        region: '문경시', tag: '문화', emoji: '🏔', desc: '조선시대 영남대로의 중심 고갯길' },
  { id: 8,  name: '경주 첨성대',     region: '경주시', tag: '문화', emoji: '🌙', desc: '동양 최고(最古) 석조 천문대' },
  { id: 9,  name: '호미곶',          region: '포항시', tag: '자연', emoji: '🌅', desc: '한반도 최동단, 새해 일출의 명소' },
  { id: 10, name: '안동 월영교',     region: '안동시', tag: '야경', emoji: '🌉', desc: '우리나라 최장 387m 목교' },
  { id: 11, name: '경주 불국사',     region: '경주시', tag: '문화', emoji: '⛩',  desc: '신라 불교 예술의 정수, 유네스코 세계유산' },
  { id: 12, name: '영양 자작나무숲', region: '영양군', tag: '자연', emoji: '🌲', desc: '하얀 나무들이 빛을 반사하는 신비로운 숲' },
]

const TAGS = ['전체', '자연', '문화', '야경']
const POPULAR_IDS = [5, 6, 9, 11]

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [tag, setTag]     = useState('전체')
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 150)
    return () => clearTimeout(t)
  }, [])

  const isSearching = query.trim() !== '' || tag !== '전체'

  const results = SPOTS.filter(s => {
    const matchTag = tag === '전체' || s.tag === tag
    const matchQ   = query.trim() === '' ||
      s.name.includes(query.trim()) ||
      s.region.includes(query.trim()) ||
      s.desc.includes(query.trim())
    return matchTag && matchQ
  })

  const popular = SPOTS.filter(s => POPULAR_IDS.includes(s.id))

  return (
    <div className="srch">
      {/* 헤더 + 검색바 */}
      <div className="srch-header">
        <button className="srch-back" onClick={() => navigate('/home')}>‹</button>
        <div className="srch-bar">
          <span className="srch-ic">🔍</span>
          <input
            ref={inputRef}
            className="srch-input"
            type="text"
            placeholder="장소명, 지역으로 검색..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="srch-clear" onClick={() => setQuery('')}>✕</button>
          )}
        </div>
      </div>

      {/* 카테고리 태그 */}
      <div className="srch-tags">
        {TAGS.map(t => (
          <button
            key={t}
            className={`srch-tag ${tag === t ? 'on' : ''}`}
            onClick={() => setTag(t)}
          >{t}</button>
        ))}
      </div>

      {/* 스크롤 영역 */}
      <div className="srch-scroll">
        {!isSearching ? (
          <>
            <div>
              <p className="srch-sec">추천 장소</p>
              <div className="srch-popular">
                {popular.map(s => (
                  <div key={s.id} className="srch-pop-card">
                    <span className="srch-pop-emoji">{s.emoji}</span>
                    <p className="srch-pop-name">{s.name}</p>
                    <p className="srch-pop-region">{s.region}</p>
                    <span className="srch-pop-tag">{s.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="srch-sec">전체 장소</p>
              <div className="srch-list">
                {SPOTS.map(s => (
                  <div key={s.id} className="srch-row">
                    <div className="srch-row-thumb">{s.emoji}</div>
                    <div className="srch-row-body">
                      <p className="srch-row-name">{s.name}</p>
                      <p className="srch-row-meta">📍 {s.region} · {s.tag}</p>
                    </div>
                    <span className="srch-row-arr">›</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="srch-result-cnt">
              {results.length > 0
                ? `${results.length}개의 장소를 찾았어요`
                : '검색 결과가 없어요'}
            </p>
            {results.length === 0 ? (
              <div className="srch-empty">
                <span>🔍</span>
                <p>다른 키워드로 검색해 보세요</p>
              </div>
            ) : (
              <div className="srch-list srch-list-gap">
                {results.map(s => (
                  <div key={s.id} className="srch-card">
                    <div className="srch-card-thumb">{s.emoji}</div>
                    <div className="srch-card-body">
                      <p className="srch-card-name">{s.name}</p>
                      <p className="srch-card-region">📍 {s.region}</p>
                      <p className="srch-card-desc">{s.desc}</p>
                    </div>
                    <span className="srch-card-tag">{s.tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
