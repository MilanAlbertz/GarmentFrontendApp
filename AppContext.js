// AppContext.js

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [filterChanged, setFilterChanged] = useState(false);

  const triggerSwipeViewMethod = () => {
    setFilterChanged(!filterChanged);
  };

  const handleFilterChange = () => {
    triggerSwipeViewMethod();
  };

  return (
    <AppContext.Provider value={{ filterChanged, triggerSwipeViewMethod, handleFilterChange }}>
      {children}
    </AppContext.Provider>
  );
};
