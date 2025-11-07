import { useState } from "react";
import { Map, MapMarker, useMap, Polyline} from "react-kakao-maps-sdk";
import "./App.css";

export default function App() {
  const [mapCenter] = useState({ lat: 37.566826, lng: 126.9786567 });

  const data = [
    {
      content: <div style={{color:"#000"}}>동빙고 성수</div>,
      latlng: { lat: 37.546941984588294, lng: 127.04385817930245 },
    },
    {
      content: <div style={{color:"#000"}}>우육미</div>,
      latlng: { lat: 37.565205877618574, lng: 127.01299116647724 },
    },
    {
      content: <div style={{color:"#000"}}>스시쥬베이</div>,
      latlng: { lat: 37.478281149638924, lng: 126.89048464045929 },
    },
    {
      content: <div style={{color:"#000"}}>글로우</div>,
      latlng: { lat: 37.48210455224547, lng: 126.82107561474913 },
    },
    {
      content: <div style={{color:"#000"}}>스시유타카</div>,
      latlng: { lat: 37.52106921789313, lng: 126.92402200851367},
    },
  ]
  
  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap()
    const [isVisible, setIsVisible] = useState(false)

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        // @ts-ignore
        onClick={(marker) => map.panTo(marker.getPosition())}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    )
  }

  return (
    <div className="mapWrapper">
      <Map // 지도를 표시할 Container
        center={mapCenter}
        className="map"
        level={8} // 지도의 확대 레벨
      >
        <Polyline
          path={[
            [
              data[0].latlng,
              data[1].latlng,
            ],
            [
              data[1].latlng,
              data[4].latlng,
            ],
            [
              data[2].latlng,
              data[4].latlng,
            ],
            [
              data[2].latlng,
              data[3].latlng,
            ],
          ]}
          strokeWeight={5} // 선의 두께 입니다
          strokeColor={"#28ffed"} // 선의 색깔입니다
          strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일입니다
        />
        {data.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            content={value.content}
          />
        ))}
      </Map>
    </div>
  )
}