import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SWEET_ENCYCLOPEDIA} from '../data/encyclopedia';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({children}) => {
  const [encyclopediaData, setEncyclopediaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize encyclopedia data
  const initializeEncyclopedia = async () => {
    try {
      // Check if data exists in AsyncStorage
      const storedData = await AsyncStorage.getItem('@encyclopedia_data');

      if (storedData) {
        // If data exists, use it
        setEncyclopediaData(JSON.parse(storedData));
      } else {
        // If no data, store the initial data from SWEET_ENCYCLOPEDIA
        await AsyncStorage.setItem(
          '@encyclopedia_data',
          JSON.stringify(SWEET_ENCYCLOPEDIA),
        );
        setEncyclopediaData(SWEET_ENCYCLOPEDIA);
      }
    } catch (error) {
      console.error('Error initializing encyclopedia:', error);
      // If there's an error, fallback to initial data
      setEncyclopediaData(SWEET_ENCYCLOPEDIA);
    } finally {
      setIsLoading(false);
    }
  };

  // Update encyclopedia data
  const updateEncyclopedia = async newData => {
    try {
      await AsyncStorage.setItem('@encyclopedia_data', JSON.stringify(newData));
      setEncyclopediaData(newData);
    } catch (error) {
      console.error('Error updating encyclopedia:', error);
    }
  };

  // Reset encyclopedia to initial data
  const resetEncyclopedia = async () => {
    try {
      await AsyncStorage.setItem(
        '@encyclopedia_data',
        JSON.stringify(SWEET_ENCYCLOPEDIA),
      );
      setEncyclopediaData(SWEET_ENCYCLOPEDIA);
    } catch (error) {
      console.error('Error resetting encyclopedia:', error);
    }
  };

  useEffect(() => {
    initializeEncyclopedia();
  }, []);

  const value = {
    encyclopediaData,
    isLoading,
    updateEncyclopedia,
    resetEncyclopedia,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
