import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import BottomNav from '../components/BottomNav'
import './Map.css'

// Leaflet 기본 마커 아이콘 Vite 호환 픽스
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl: markerIconUrl, shadowUrl: markerShadowUrl })

const SPOTS = [
  { id: 1,  name: '청량산 도립공원', region: '봉화군', lat: 36.7567, lng: 128.9194, tag: '자연', emoji: '⛰', desc: '기암절벽과 솔숲이 어우러진 청정 명산' },
  { id: 2,  name: '반변천 생태공원', region: '영양군', lat: 36.6667, lng: 129.1167, tag: '자연', emoji: '🌊', desc: '별빛 아래 강변을 따라 걷는 고요한 산책로' },
  { id: 3,  name: '불영계곡',        region: '울진군', lat: 36.9042, lng: 129.2967, tag: '자연', emoji: '🏞', desc: '36km 에메랄드 물빛 계곡의 비경' },
  { id: 4,  name: '도산서원',        region: '안동시', lat: 36.7169, lng: 128.7326, tag: '문화', emoji: '🏛', desc: '퇴계 이황의 정신이 깃든 유네스코 세계유산' },
  { id: 5,  name: '하회마을',        region: '안동시', lat: 36.5388, lng: 128.5159, tag: '문화', emoji: '🏡', desc: '낙동강이 감싸는 600년 전통 마을' },
  { id: 6,  name: '주왕산 국립공원', region: '청송군', lat: 36.3944, lng: 129.1494, tag: '자연', emoji: '🗻', desc: '기암단애가 절경인 국립공원' },
  { id: 7,  name: '문경새재',        region: '문경시', lat: 36.7641, lng: 128.0988, tag: '문화', emoji: '🏔', desc: '조선시대 영남대로의 중심 고갯길' },
  { id: 8,  name: '경주 첨성대',     region: '경주시', lat: 35.8348, lng: 129.2191, tag: '문화', emoji: '🌙', desc: '동양 최고(最古) 석조 천문대' },
  { id: 9,  name: '호미곶',          region: '포항시', lat: 36.0774, lng: 129.5639, tag: '자연', emoji: '🌅', desc: '한반도 최동단, 새해 일출의 명소' },
  { id: 10, name: '안동 월영교',     region: '안동시', lat: 36.5721, lng: 128.7301, tag: '야경', emoji: '🌉', desc: '우리나라 최장 387m 목교' },
  { id: 11, name: '경주 불국사',     region: '경주시', lat: 35.7900, lng: 129.3316, tag: '문화', emoji: '⛩',  desc: '신라 불교 예술의 정수, 유네스코 세계유산' },
  { id: 12, name: '영양 자작나무숲', region: '영양군', lat: 36.6072, lng: 129.1122, tag: '자연', emoji: '🌲', desc: '하얀 나무들이 빛을 반사하는 신비로운 숲' },
]

const CATS = ['전체', '자연', '문화', '야경']

function createIcon(emoji, selected) {
  return L.divIcon({
    className: '',
    html: `<div class="lmk ${selected ? 'sel' : ''}">${emoji}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -22],
  })
}

function PanTo({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.setView(center, 13, { animate: true })
  }, [center, map])
  return null
}

export default function Map() {
  const [query, setQuery]     = useState('')
  const [cat, setCat]         = useState('전체')
  const [selected, setSelected] = useState(null)
  const [panTarget, setPanTarget] = useState(null)

  const filtered = SPOTS.filter(s => {
    const matchCat = cat === '전체' || s.tag === cat
    const matchQ   = query === '' ||
      s.name.toLowerCase().includes(query) ||
      s.region.includes(query) ||
      s.tag.includes(query)
    return matchCat && matchQ
  })

  const handleSelect = (spot) => {
    setSelected(spot.id)
    setPanTarget([spot.lat, spot.lng])
  }

  return (
    <div className="mp">
      <div className="mp-scroll">

        {/* 헤더 */}
        <div className="mp-header">
          <h1 className="mp-title">지도</h1>
          <span className="mp-cnt">경상북도 {SPOTS.length}곳</span>
        </div>

        {/* 검색바 */}
        <div className="mp-searchbar">
          <span className="mp-search-ic">🔍</span>
          <input
            className="mp-search-input"
            type="text"
            placeholder="관광지 이름, 지역, 태그로 검색"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="mp-search-clear" onClick={() => setQuery('')}>✕</button>
          )}
        </div>

        {/* 지도 */}
        <div className="mp-map-wrap">
          <MapContainer
            center={[36.45, 128.9]}
            zoom={8}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />
            {panTarget && <PanTo center={panTarget} />}
            {SPOTS.map(spot => (
              <Marker
                key={spot.id}
                position={[spot.lat, spot.lng]}
                icon={createIcon(spot.emoji, selected === spot.id)}
                eventHandlers={{ click: () => handleSelect(spot) }}
              >
                <Popup className="mp-popup">
                  <div className="mp-popup-inner">
                    <span className="mp-popup-emoji">{spot.emoji}</span>
                    <div>
                      <p className="mp-popup-name">{spot.name}</p>
                      <p className="mp-popup-region">{spot.region}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* 카테고리 필터 */}
        <div className="mp-cats">
          {CATS.map(c => (
            <button
              key={c}
              className={`mp-cat ${cat === c ? 'on' : ''}`}
              onClick={() => setCat(c)}
            >{c}</button>
          ))}
        </div>

        {/* 결과 개수 */}
        <div className="mp-list-header">
          <span className="mp-list-cnt">{filtered.length}개의 장소</span>
          {(query || cat !== '전체') && (
            <button className="mp-list-reset" onClick={() => { setQuery(''); setCat('전체') }}>
              초기화
            </button>
          )}
        </div>

        {/* 장소 목록 */}
        <div className="mp-list">
          {filtered.length === 0 ? (
            <div className="mp-empty">
              <span>🔍</span>
              <p>"{query}"에 대한 결과가 없어요</p>
            </div>
          ) : filtered.map(spot => (
            <div
              key={spot.id}
              className={`mp-card ${selected === spot.id ? 'sel' : ''}`}
              onClick={() => handleSelect(spot)}
            >
              <div className="mp-card-thumb">{spot.emoji}</div>
              <div className="mp-card-body">
                <p className="mp-card-name">{spot.name}</p>
                <p className="mp-card-region">📍 {spot.region}</p>
                <p className="mp-card-desc">{spot.desc}</p>
              </div>
              <span className="mp-card-tag">{spot.tag}</span>
            </div>
          ))}
        </div>

      </div>
      <BottomNav />
    </div>
  )
}
