import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SWEET_ENCYCLOPEDIA} from '../data/encyclopedia';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({children}) => {
  const [encyclopediaData, setEncyclopediaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sweets, setSweets] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    loadSweets();
    loadCollections();
  }, []);

  // Load sweets from AsyncStorage
  const loadSweets = async () => {
    try {
      const storedSweets = await AsyncStorage.getItem('@user_sweets');
      if (storedSweets) {
        setSweets(JSON.parse(storedSweets));
      }
    } catch (error) {
      console.error('Error loading sweets:', error);
    }
  };

  // Save new sweet
  const saveSweet = async sweetData => {
    try {
      const newSweet = {
        id: Date.now().toString(), // Simple unique ID
        ...sweetData,
        createdAt: new Date().toISOString(),
      };

      const updatedSweets = [...sweets, newSweet];
      await AsyncStorage.setItem('@user_sweets', JSON.stringify(updatedSweets));
      setSweets(updatedSweets);
      return true;
    } catch (error) {
      console.error('Error saving sweet:', error);
      return false;
    }
  };
  // Delete sweet
  const deleteSweet = async sweetId => {
    try {
      const updatedSweets = sweets.filter(sweet => sweet.id !== sweetId);
      await AsyncStorage.setItem('@user_sweets', JSON.stringify(updatedSweets));
      setSweets(updatedSweets);
      return true;
    } catch (error) {
      console.error('Error deleting sweet:', error);
      return false;
    }
  };

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

  const loadCollections = async () => {
    try {
      const savedCollections = await AsyncStorage.getItem('@collections');
      if (savedCollections) {
        setCollections(JSON.parse(savedCollections));
      }
    } catch (error) {
      console.error('Error loading collections:', error);
    }
  };

  const saveCollection = async (newCollection) => {
    try {
      const updatedCollections = [...collections, {
        id: Date.now().toString(),
        ...newCollection,
        createdAt: new Date().toISOString(),
      }];
      
      await AsyncStorage.setItem('@collections', JSON.stringify(updatedCollections));
      setCollections(updatedCollections);
      return true;
    } catch (error) {
      console.error('Error saving collection:', error);
      return false;
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      const updatedCollections = collections.filter(c => c.id !== collectionId);
      await AsyncStorage.setItem('@collections', JSON.stringify(updatedCollections));
      setCollections(updatedCollections);
      return true;
    } catch (error) {
      console.error('Error deleting collection:', error);
      return false;
    }
  };

  const value = {
    encyclopediaData,
    isLoading,
    updateEncyclopedia,
    resetEncyclopedia,
    sweets,
    saveSweet,
    deleteSweet,
    collections,
    saveCollection,
    deleteCollection,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
