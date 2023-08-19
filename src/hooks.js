import { useState, useEffect } from 'react';
import axios from 'axios';

function useFlip() {
    const [isFlipped, setIsFlipped] = useState(true);

    const toggleFlip = () => {
        setIsFlipped(currentState => !currentState);
    };

    return [isFlipped, toggleFlip];
}

function useAxios(baseUrl) {
  const [data, setData] = useLocalStorage(baseUrl, []);

  const addData = async (urlExtension = "") => {
    const response = await axios.get(`${baseUrl}${urlExtension}`);
    setData(currentData => [...currentData, response.data]);
  };

  const clearData = () => {
    setData([]);
  };

  return [data, addData, clearData];
}

function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { useAxios, useFlip, useLocalStorage };
