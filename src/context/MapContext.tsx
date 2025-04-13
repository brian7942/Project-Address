'use client';

import { createContext, useContext, useState } from 'react';

type BuildingData = {
  id?: number;
  name?: string;
  [key: string]: any;
};

type SelectedBuilding = {
  lat: number;
  lng: number;
  data: BuildingData | null;
};

type MapContextType = {
  selectedBuilding: SelectedBuilding | null;
  setSelectedBuilding: (b: SelectedBuilding | null) => void;
};

export const MapContext = createContext<MapContextType>({
  selectedBuilding: null,
  setSelectedBuilding: () => {},
});

export const MapContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<SelectedBuilding | null>(null);

  return (
    <MapContext.Provider value={{ selectedBuilding, setSelectedBuilding }}>
      {children}
    </MapContext.Provider>
  );
};
