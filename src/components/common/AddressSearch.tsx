"use client"

import { useState } from 'react'
import * as LucideIcons from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface AddressSearchProps {
  onSearch: (lat: number, lng: number) => void;
  className?: string;
}

const AddressSearch = ({ onSearch, className = "" }: AddressSearchProps) => {
  const [address, setAddress] = useState('')
  const { t } = useTranslation()

  const handleSearch = async () => {
    // TODO: 실제 지오코딩 API 연동 필요
    // 현재는 더미 데이터로 대체
    const dummyLocations: {[key: string]: [number, number]} = {
      '비엔티안': [17.9757, 102.6331],
      '루앙프라방': [19.8563, 102.1357],
      '사바나켓': [16.5854, 104.7459]
    }

    const location = dummyLocations[address]
    if (location) {
      onSearch(location[0], location[1])
    } else {
      alert(t('common.locationNotFound'))
    }
  }

  return (
    <div className={`${className} flex space-x-2`}>
      <input 
        type="text" 
        placeholder={t('common.searchPlaceholder')}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="flex-grow border rounded-md px-2 py-1"
      />
      <button 
        onClick={handleSearch}
        className="bg-primary-600 text-white rounded-md px-3 py-1 flex items-center"
      >
        <LucideIcons.Search className="w-5 h-5 mr-1" />
        {t('common.search')}
      </button>
    </div>
  )
}

export default AddressSearch