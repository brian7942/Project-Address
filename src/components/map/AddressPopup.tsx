'use client';

import { Marker, Popup } from 'react-leaflet';
import { useContext } from 'react';
import { MapContext } from '@/context/MapContext';
import L from 'leaflet';

export default function AddressPopup() {
  const { selectedBuilding } = useContext(MapContext);

  if (!selectedBuilding || !selectedBuilding.data) return null;

  const { lat, lng, data } = selectedBuilding;

  return (
    <Marker position={[lat, lng]} icon={L.icon({ iconUrl: '/leaflet/marker-icon.png' })}>
      <Popup>
        <div className="text-sm">
          <p className="font-bold">건물 정보</p>
          {data.name && <p>이름: {data.name}</p>}
          {data.unique_address && <p>주소: {data.unique_address}</p>}
          {!data.unique_address && <p>아직 주소가 지정되지 않았습니다.</p>}
        </div>
      </Popup>
    </Marker>
  );
}
