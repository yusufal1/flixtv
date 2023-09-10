'use client'

import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export const useTabs = () => {
  return useContext(TabsContext);
}

export const TabsProvider = ({ children }) => {
  const [tabs, setTabs] = useState('top_rated');

  return (
    <TabsContext.Provider value={{ tabs, setTabs }}>
      {children}
    </TabsContext.Provider>
  );
};
