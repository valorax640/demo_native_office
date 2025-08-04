import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        address,
        updateLocation,
        updateAddress,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
